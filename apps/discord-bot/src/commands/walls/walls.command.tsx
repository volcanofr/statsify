/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { Command } from '@statsify/discord';
import { WallsModes, WALLS_MODES } from '@statsify/schemas';
import { BaseHypixelCommand, BaseProfileProps } from '../base.hypixel-command';
import { WallsProfile } from './walls.profile';

@Command({ description: (t) => t('commands.walls') })
export class WallsCommand extends BaseHypixelCommand<WallsModes> {
  public constructor() {
    super(WALLS_MODES);
  }

  public getProfile(base: BaseProfileProps): JSX.Element {
    return <WallsProfile {...base} />;
  }
}
