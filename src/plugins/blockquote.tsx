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

import BlockquoteIcon from '@material-ui/icons/FormatQuote';
import * as React from 'react';
import createBlockquotePlugin from '@guestbell/slate-edit-blockquote';

import { ToolbarButton } from '../helpers';
import Plugin, { PluginButtonProps, PluginGetComponent } from './Plugin';
import { Block, Editor } from 'slate';
import { RenderNodeProps } from 'slate-react';
import { SlatePluginSettings } from './../types/plugin';
import { NextType } from '../types/next';
import DEFAULT_NODE from './DEFAULT_NODE';
export const BLOCKQUOTE = 'BLOCKQUOTE/BLOCKQUOTE';

const ALLOWED_TYPES = [BLOCKQUOTE];
const DEFAULT_MAPPING = {
  [BLOCKQUOTE]: 'blockquote',
};

const defaultGetComponent: PluginGetComponent = ({ type }) =>
  DEFAULT_MAPPING[type];

export interface BlockquotePluginSettings extends SlatePluginSettings {
  DEFAULT_NODE?: string;
}

export default class BlockquotePlugin extends Plugin {
  name = 'blockquote';

  /*schema = {
    nodes: {
      [BLOCKQUOTE]: makeTagNode('blockquote'),
    },
  };*/

  // tslint:disable-next-line:no-any
  plugins: any = [
    createBlockquotePlugin({
      type: BLOCKQUOTE,
      typeDefault: this.DEFAULT_NODE,
    }),
  ];

  constructor(props: BlockquotePluginSettings = {}) {
    super();

    this.DEFAULT_NODE = props.DEFAULT_NODE || DEFAULT_NODE;
    this.toolbarButtons = [this.Button];
    this.getComponent = props.getComponent || defaultGetComponent;
  }

  // eslint-disable-next-line react/display-name
  Button: React.SFC<PluginButtonProps> = ({ editorState, editor }) => {
    const onClick: React.MouseEventHandler = e => {
      e.preventDefault();

      const _isActive = editorState.blocks.some(block =>
        Boolean(
          editorState.document.getClosest(
            block.key,
            parent => (parent as Block).type === BLOCKQUOTE
          )
        )
      );

      if (_isActive) {
        editor.unwrapBlock(BLOCKQUOTE);
      } else {
        editor.wrapBlock(BLOCKQUOTE);
      }
    };

    const isActive = editorState.blocks.some(block =>
      Boolean(
        editorState.document.getClosest(
          block.key,
          parent => (parent as Block).type === BLOCKQUOTE
        )
      )
    );

    return (
      <ToolbarButton
        onClick={onClick}
        isActive={isActive}
        icon={<BlockquoteIcon />}
      />
    );
  }

  deserialize = (el, next) => {
    switch (el.tagName.toLowerCase()) {
      case 'blockquote':
        return {
          object: 'block',
          type: BLOCKQUOTE,
          nodes: next(el.childNodes),
        };
      default:
        return;
    }
  }

  serialize = (
    // tslint:disable-next-line:no-any
    object: { type: string; object: string; data: any },
    // tslint:disable-next-line:no-any
    children: any[]
  ) => {
    if (object.object !== 'block') {
      return;
    }
    if (!ALLOWED_TYPES.includes(object.type)) {
      return;
    }
    const Component = this.getComponent({
      type: object.type,
      object: 'block',
      data: object.data,
    });
    if (Component) {
      return (
        <Component style={{ textAlign: object.data.get('align') }}>
          {children}
        </Component>
      );
    }
  }

  renderNode = (props: RenderNodeProps, editor: Editor, next: NextType) => {
    // tslint:disable-next-line:no-any

    if (!ALLOWED_TYPES.includes(props.node.type)) {
      return next();
    }
    const Component = this.getComponent({
      type: props.node.type,
      object: 'block',
      data: props.node.data,
    });
    if (Component) {
      return (
        <Component style={{ textAlign: props.node.data.get('align') }}>
          {props.children}
        </Component>
      );
    }
  }
}
