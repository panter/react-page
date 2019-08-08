/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

import throttle from 'lodash.throttle';
import * as React from 'react';
import {
  computeAndDispatchHover,
  computeAndDispatchInsert
} from '../../../service/hover/input';
import { ComponetizedRow, ComponetizedCell } from '../../../types/editable';
import { delay } from '../../../helper/throttle';
import logger from '../../../service/logger';
import {
  isNativeHTMLElementDrag,
  createNativeCellReplacement
} from '../../../helper/nativeDragHelpers';
import { DropTargetMonitor, DropTargetConnector } from 'dnd-core';

let last: { hover: string; drag: string } = {
  hover: '',
  drag: '',
};

const clear = (hover: ComponetizedRow, drag: string) => {
  if (hover.id === last.hover && drag === last.drag) {
    return;
  }
  last = { hover: hover.id, drag };
  hover.clearHover(drag);
};

export const target = {
  hover: throttle(
    (hover: ComponetizedRow, monitor: DropTargetMonitor, component: React.ReactInstance) => {
      // tslint:disable-next-line:no-any
      let drag: any = monitor.getItem();
      if (!drag) {
        // item undefined, happens when throttle triggers after drop
        return;
      }

      if (isNativeHTMLElementDrag(monitor)) {
        drag = createNativeCellReplacement();
      }

      if (!drag) {
        return;
      } else if (drag.id === hover.id) {
        clear(hover, drag.id);
        return;
      } else if (!monitor.isOver({ shallow: true })) {
        return;
      } else if (hover.ancestors.indexOf(drag.id) > -1) {
        // If hovering over a child of itself
        clear(hover, drag.id);
        return;
      } else if (!hover.id) {
        // If hovering over something that isn't a cell or hasn't an id, do nothing. Should be an edge case
        logger.warn(
          'Canceled cell.drop.target.hover: no id given.',
          hover,
          drag
        );
        return;
      }

      computeAndDispatchHover(
        // tslint:disable-next-line:no-any
        hover as any,
        drag,
        monitor,
        component,
        '10x10-no-inline'
      );
    },
    delay,
    { leading: false }
  ),

  canDrop: ({ id, ancestors }: ComponetizedRow, monitor: DropTargetMonitor) => {
    const item = monitor.getItem();
    return item.id !== id || ancestors.indexOf(item.id) === -1;
  },

  // tslint:disable-next-line:no-any
  drop(hover: ComponetizedRow, monitor: DropTargetMonitor, component: any) {
    let drag: ComponetizedCell = monitor.getItem();

    if (isNativeHTMLElementDrag(monitor)) {
      const { plugins } = component.props.config;
      drag = plugins.createNativePlugin(hover, monitor, component);
    }

    if (monitor.didDrop() || !monitor.isOver({ shallow: true })) {
      // If the item drop occurred deeper down the tree, don't do anything
      return;
    } else if (hover.ancestors.indexOf(drag.id) > -1) {
      // If hovering over a child of itself
      hover.cancelCellDrag(drag.id);
      return;
    } else if (drag.id === hover.id) {
      hover.cancelCellDrag(drag.id);
      return;
    }

    computeAndDispatchInsert(
      // tslint:disable-next-line:no-any
      hover as any,
      drag,
      monitor,
      component,
      '10x10-no-inline'
    );
  },
};

export const connect = (
  _connect: DropTargetConnector,
  monitor: DropTargetMonitor
) => ({
  connectDropTarget: _connect.dropTarget(),
  isOverCurrent: monitor.isOver({ shallow: true }),
});
