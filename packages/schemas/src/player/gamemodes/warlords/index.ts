import { add, ratio, sub } from '@statsify/math';
import { APIData } from '@statsify/util';
import { Field } from '../../../metadata';
import { WarlordsClass } from './class';

export const WARLORDS_MODES = ['overall'] as const;
export type WarlordsModes = typeof WARLORDS_MODES;

export class Warlords {
  @Field()
  public mage: WarlordsClass;

  @Field()
  public warrior: WarlordsClass;

  @Field()
  public paladin: WarlordsClass;

  @Field()
  public shaman: WarlordsClass;

  @Field({ store: { default: 'warrior' } })
  public class: string;

  @Field()
  public coins: number;

  @Field()
  public gamesPlayed: number;

  @Field()
  public wins: number;

  @Field()
  public losses: number;

  @Field()
  public wlr: number;

  @Field()
  public kills: number;

  @Field()
  public deaths: number;

  @Field()
  public kdr: number;

  @Field()
  public assists: number;

  public constructor(data: APIData) {
    this.mage = new WarlordsClass(data, 'mage');
    this.warrior = new WarlordsClass(data, 'warrior');
    this.paladin = new WarlordsClass(data, 'paladin');
    this.shaman = new WarlordsClass(data, 'shaman');

    this.class = data.chosen_class || 'warrior';
    this.coins = data.coins;

    this.gamesPlayed = Math.ceil(
      add(
        data.aquamancer_plays,
        data.avenger_plays,
        data.berserker_plays,
        data.crusader_plays,
        data.cryomancer_plays,
        data.defender_plays,
        data.earthwarden_plays,
        data.mage_plays,
        data.paladin_plays,
        data.protector_plays,
        data.pyromancer_plays,
        data.revenant_plays,
        data.shaman_plays,
        data.spiritguard_plays,
        data.thunderlord_plays,
        data.warrior_plays
      ) / 2
    );
    this.wins = data.wins;

    // Warlords Losses in API are bugged (~90% accurate)
    // https://hypixel.net/threads/warlords-skillrating-website.1560046/post-12210896
    this.losses = sub(this.gamesPlayed, this.wins);

    this.wlr = ratio(this.wins, this.losses);
    this.kills = data.kills;
    this.deaths = data.deaths;
    this.kdr = ratio(this.kills, this.deaths);
    this.assists = data.assists;
  }
}

export * from './class';
