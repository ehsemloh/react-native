/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <React/RCTVirtualRichTextShadowView.h>
#import <React/RCTVirtualRichTextView.h>
#import <React/RCTVirtualRichTextViewManager.h>

@implementation RCTVirtualRichTextViewManager

RCT_EXPORT_MODULE(RCTVirtualRichText)

- (UIView *)view
{
  return [RCTVirtualRichTextView new];
}

- (RCTShadowView *)shadowView
{
  return [RCTVirtualRichTextShadowView new];
}

@end
