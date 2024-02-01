/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <React/RCTVirtualRichTextShadowView.h>

#import <React/RCTShadowView+Layout.h>
#import <yoga/Yoga.h>

@implementation RCTVirtualRichTextShadowView {
  BOOL _isLayoutDirty;
}

#pragma mark - Layout

- (void)dirtyLayout
{
  [super dirtyLayout];

  if (_isLayoutDirty) {
    return;
  }
  _isLayoutDirty = YES;

  [self.superview dirtyLayout];
}

- (void)clearLayout
{
  _isLayoutDirty = NO;
}

@end
