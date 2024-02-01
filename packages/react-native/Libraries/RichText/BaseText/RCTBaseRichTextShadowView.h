/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <React/RCTShadowView.h>

#import "RCTRichTextAttributes.h"

NS_ASSUME_NONNULL_BEGIN

extern NSString *const RCTBaseRichTextShadowViewEmbeddedShadowViewAttributeName;

@interface RCTBaseRichTextShadowView : RCTShadowView {
 @protected
  NSAttributedString *_Nullable cachedAttributedText;
 @protected
  RCTRichTextAttributes *_Nullable cachedTextAttributes;
}

@property (nonatomic, strong) RCTRichTextAttributes *textAttributes;

- (NSAttributedString *)attributedTextWithBaseTextAttributes:(nullable RCTRichTextAttributes *)baseTextAttributes;

@end

NS_ASSUME_NONNULL_END
