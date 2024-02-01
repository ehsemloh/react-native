/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <React/RCTBaseRichTextShadowView.h>

#import <React/RCTShadowView+Layout.h>

#import <React/RCTRawTextShadowView.h>
#import <React/RCTVirtualRichTextShadowView.h>

NSString *const RCTBaseRichTextShadowViewEmbeddedShadowViewAttributeName =
    @"RCTBaseRichTextShadowViewEmbeddedShadowViewAttributeName";

static void RCTInlineViewYogaNodeDirtied(YGNodeConstRef node)
{
  // An inline view (a view nested inside of a text node) does not have a parent
  // in the Yoga tree. Consequently, we have to manually propagate the inline
  // view's dirty signal up through the text nodes. At some point, it'll reach
  // the outermost text node which has a Yoga node and then Yoga will take over
  // the dirty signal propagation.
  RCTShadowView *inlineView = (__bridge RCTShadowView *)YGNodeGetContext(node);
  RCTBaseRichTextShadowView *baseTextShadowView = (RCTBaseRichTextShadowView *)inlineView.reactSuperview;

  [baseTextShadowView dirtyLayout];
}

@implementation RCTBaseRichTextShadowView

- (instancetype)init
{
  if (self = [super init]) {
    _textAttributes = [RCTRichTextAttributes new];
  }

  return self;
}

- (void)setReactTag:(NSNumber *)reactTag
{
  [super setReactTag:reactTag];
  _textAttributes.tag = reactTag;
}

#pragma mark - Life Cycle

- (void)insertReactSubview:(RCTShadowView *)subview atIndex:(NSInteger)index
{
  [super insertReactSubview:subview atIndex:index];

  [self dirtyLayout];

  if (![subview isKindOfClass:[RCTVirtualRichTextShadowView class]]) {
    YGNodeSetDirtiedFunc(subview.yogaNode, RCTInlineViewYogaNodeDirtied);
  }
}

- (void)removeReactSubview:(RCTShadowView *)subview
{
  if (![subview isKindOfClass:[RCTVirtualRichTextShadowView class]]) {
    YGNodeSetDirtiedFunc(subview.yogaNode, NULL);
  }

  [self dirtyLayout];

  [super removeReactSubview:subview];
}

#pragma mark - attributedString

- (NSAttributedString *)attributedTextWithBaseTextAttributes:(nullable RCTRichTextAttributes *)baseTextAttributes
{
  RCTRichTextAttributes *textAttributes;

  if (baseTextAttributes) {
    textAttributes = [baseTextAttributes copy];
    [textAttributes applyTextAttributes:self.textAttributes];
  } else {
    textAttributes = [self.textAttributes copy];
  }

  if (cachedAttributedText && [cachedTextAttributes isEqual:textAttributes]) {
    return cachedAttributedText;
  }

  NSMutableAttributedString *attributedText = [NSMutableAttributedString new];

  [attributedText beginEditing];

  for (RCTShadowView *shadowView in self.reactSubviews) {
    // Special Case: RCTRawTextShadowView
    if ([shadowView isKindOfClass:[RCTRawTextShadowView class]]) {
      RCTRawTextShadowView *rawTextShadowView = (RCTRawTextShadowView *)shadowView;
      NSString *text = rawTextShadowView.text;
      if (text) {
        NSAttributedString *rawTextAttributedString =
            [[NSAttributedString alloc] initWithString:[textAttributes applyTextAttributesToText:text]
                                            attributes:textAttributes.effectiveTextAttributes];
        [attributedText appendAttributedString:rawTextAttributedString];
      }
      continue;
    }

    // Special Case: RCTBaseTextShadowView
    if ([shadowView isKindOfClass:[RCTBaseRichTextShadowView class]]) {
      RCTBaseRichTextShadowView *baseTextShadowView = (RCTBaseRichTextShadowView *)shadowView;
      NSAttributedString *baseTextAttributedString =
          [baseTextShadowView attributedTextWithBaseTextAttributes:textAttributes];
      [attributedText appendAttributedString:baseTextAttributedString];
      continue;
    }

    // Generic Case: Any RCTShadowView
    NSTextAttachment *attachment = [NSTextAttachment new];
    NSMutableAttributedString *embeddedShadowViewAttributedString = [NSMutableAttributedString new];
    [embeddedShadowViewAttributedString beginEditing];
    [embeddedShadowViewAttributedString
        appendAttributedString:[NSAttributedString attributedStringWithAttachment:attachment]];
    [embeddedShadowViewAttributedString addAttribute:RCTBaseRichTextShadowViewEmbeddedShadowViewAttributeName
                                               value:shadowView
                                               range:(NSRange){0, embeddedShadowViewAttributedString.length}];
    [embeddedShadowViewAttributedString endEditing];
    [attributedText appendAttributedString:embeddedShadowViewAttributedString];
  }

  [attributedText endEditing];

  [self clearLayout];

  cachedAttributedText = [attributedText copy];
  cachedTextAttributes = textAttributes;

  return cachedAttributedText;
}

- (void)dirtyLayout
{
  [super dirtyLayout];
  cachedAttributedText = nil;
  cachedTextAttributes = nil;
}

- (void)didUpdateReactSubviews
{
  [super didUpdateReactSubviews];
  [self dirtyLayout];
}

- (void)didSetProps:(NSArray<NSString *> *)changedProps
{
  [super didSetProps:changedProps];
  [self dirtyLayout];
}

@end
