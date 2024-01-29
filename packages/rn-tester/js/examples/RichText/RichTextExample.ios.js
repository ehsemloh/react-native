/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict';

import type {RNTesterModule} from '../../types/RNTesterTypes';

const React = require('react');
const TextInlineView = require('../../components/TextInlineView');
import TextLegend from '../../components/TextLegend';

const {
  Button,
  LayoutAnimation,
  Platform,
  RichText,
  TextInput,
  View,
} = require('react-native');

type TextAlignExampleRTLState = {|
  isRTL: boolean,
|};

class TextAlignRTLExample extends React.Component<
  {},
  TextAlignExampleRTLState,
> {
  constructor(...args: Array<any>) {
    super(...args);

    this.state = {
      isRTL: false,
    };
  }

  render(): React.Node {
    const {isRTL} = this.state;
    const toggleRTL = () => this.setState({isRTL: !isRTL});
    return (
      <View style={{direction: isRTL ? 'rtl' : 'ltr'}}>
        <RichText>auto (default) - english LTR</RichText>
        <RichText>
          {'\u0623\u062D\u0628 \u0627\u0644\u0644\u063A\u0629 ' +
            '\u0627\u0644\u0639\u0631\u0628\u064A\u0629 auto (default) - arabic RTL'}
        </RichText>
        <RichText style={{textAlign: 'left'}}>
          left left left left left left left left left left left left left left
          left
        </RichText>
        <RichText style={{textAlign: 'center'}}>
          center center center center center center center center center center
          center
        </RichText>
        <RichText style={{textAlign: 'right'}}>
          right right right right right right right right right right right
          right right
        </RichText>
        <RichText style={{textAlign: 'justify'}}>
          justify: this text component{"'"}s contents are laid out with
          "textAlign: justify" and as you can see all of the lines except the
          last one span the available width of the parent container.
        </RichText>
        <Button
          onPress={toggleRTL}
          title={`Switch to ${isRTL ? 'LTR' : 'RTL'}`}
        />
      </View>
    );
  }
}

class Entity extends React.Component<$FlowFixMeProps> {
  render(): React.Node {
    return (
      <RichText style={{fontWeight: '500', color: '#527fe4'}}>
        {this.props.children}
      </RichText>
    );
  }
}

class AttributeToggler extends React.Component<{...}, $FlowFixMeState> {
  state: any | {fontSize: number, fontWeight: string} = {
    fontWeight: 'bold',
    fontSize: 15,
  };

  toggleWeight = () => {
    this.setState({
      fontWeight: this.state.fontWeight === 'bold' ? 'normal' : 'bold',
    });
  };

  increaseSize = () => {
    this.setState({
      fontSize: this.state.fontSize + 1,
    });
  };

  render(): React.Node {
    const curStyle = {
      fontWeight: this.state.fontWeight,
      fontSize: this.state.fontSize,
    };
    return (
      <View>
        {/* $FlowFixMe[incompatible-type] */}
        <RichText style={curStyle}>
          Tap the controls below to change attributes.
        </RichText>
        <RichText>
          <RichText>
            See how it will even work on {/* $FlowFixMe[incompatible-type] */}
            <RichText style={curStyle}>this nested text</RichText>
          </RichText>
        </RichText>
        <RichText
          style={{backgroundColor: '#ffaaaa', marginTop: 5}}
          onPress={this.toggleWeight}>
          Toggle Weight
        </RichText>
        <RichText
          style={{backgroundColor: '#aaaaff', marginTop: 5}}
          onPress={this.increaseSize}>
          Increase Size
        </RichText>
      </View>
    );
  }
}

type AdjustingFontSizeProps = $ReadOnly<{||}>;

type AdjustingFontSizeState = {|
  dynamicText: string,
  shouldRender: boolean,
|};

class AdjustingFontSize extends React.Component<
  AdjustingFontSizeProps,
  AdjustingFontSizeState,
> {
  state: AdjustingFontSizeState = {
    dynamicText: '',
    shouldRender: true,
  };

  reset = () => {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      shouldRender: false,
    });
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      this.setState({
        dynamicText: '',
        shouldRender: true,
      });
    }, 300);
  };

  addText = () => {
    this.setState({
      dynamicText:
        this.state.dynamicText +
        (Math.floor((Math.random() * 10) % 2) ? ' foo' : ' bar'),
    });
  };

  removeText = () => {
    this.setState({
      dynamicText: this.state.dynamicText.slice(
        0,
        this.state.dynamicText.length - 4,
      ),
    });
  };

  render(): React.Node {
    if (!this.state.shouldRender) {
      return <View />;
    }
    return (
      <View>
        <RichText
          ellipsizeMode="tail"
          numberOfLines={1}
          style={{fontSize: 36, marginVertical: 6}}>
          Truncated text is baaaaad.
        </RichText>
        <RichText
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          style={{fontSize: 40, marginVertical: 6}}>
          Shrinking to fit available space is much better!
        </RichText>

        <RichText
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={{fontSize: 30, marginVertical: 6}}>
          {'Add text to me to watch me shrink!' + ' ' + this.state.dynamicText}
        </RichText>

        <RichText
          adjustsFontSizeToFit={true}
          numberOfLines={4}
          style={{fontSize: 20, marginVertical: 6}}>
          {'Multiline text component shrinking is supported, watch as this reeeeaaaally loooooong teeeeeeext grooooows and then shriiiinks as you add text to me! ioahsdia soady auydoa aoisyd aosdy ' +
            ' ' +
            this.state.dynamicText}
        </RichText>

        <RichText
          adjustsFontSizeToFit={true}
          style={{fontSize: 20, marginVertical: 6, maxHeight: 50}}>
          {'Text limited by height, watch as this reeeeaaaally loooooong teeeeeeext grooooows and then shriiiinks as you add text to me! ioahsdia soady auydoa aoisyd aosdy ' +
            ' ' +
            this.state.dynamicText}
        </RichText>

        <RichText
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={{marginVertical: 6}}>
          <RichText style={{fontSize: 14}}>
            {'Differently sized nested elements will shrink together. '}
          </RichText>
          <RichText style={{fontSize: 20}}>
            {'LARGE TEXT! ' + this.state.dynamicText}
          </RichText>
        </RichText>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 5,
            marginVertical: 6,
          }}>
          <RichText style={{backgroundColor: '#ffaaaa'}} onPress={this.reset}>
            Reset
          </RichText>
          <RichText style={{backgroundColor: '#aaaaff'}} onPress={this.removeText}>
            Remove Text
          </RichText>
          <RichText style={{backgroundColor: '#aaffaa'}} onPress={this.addText}>
            Add Text
          </RichText>
        </View>
      </View>
    );
  }
}

class TextBaseLineLayoutExample extends React.Component<{}, mixed> {
  render(): React.Node {
    const texts = [];
    for (let i = 9; i >= 0; i--) {
      texts.push(
        <RichText key={i} style={{fontSize: 8 + i * 5, backgroundColor: '#eee'}}>
          {i}
        </RichText>,
      );
    }

    const marker = (
      <View style={{width: 20, height: 20, backgroundColor: 'gray'}} />
    );
    const subtitleStyle = {fontSize: 16, marginTop: 8, fontWeight: 'bold'};

    return (
      <View>
        <RichText style={subtitleStyle}>{'Nested <RichText/>s:'}</RichText>
        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          {marker}
          <RichText>{texts}</RichText>
          {marker}
        </View>

        <RichText style={subtitleStyle}>{'Array of <RichText/>s in <View>:'}</RichText>
        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          {marker}
          {texts}
          {marker}
        </View>

        {/* iOS-only because it relies on inline views being able to size to content.
         * Android's implementation requires that a width and height be specified
         * on the inline view. */}
        <RichText style={subtitleStyle}>{'Interleaving <View> and <RichText>:'}</RichText>
        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          {marker}
          <RichText selectable={true}>
            Some text.
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                backgroundColor: '#eee',
              }}>
              {marker}
              <RichText>Text inside View.</RichText>
              {marker}
            </View>
          </RichText>
          {marker}
        </View>

        <RichText style={subtitleStyle}>
          {'Multi-line interleaved <View> and <RichText>:'}
        </RichText>
        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          <RichText selectable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            venenatis,{' '}
            <View
              style={{
                backgroundColor: 'yellow',
              }}>
              <RichText>mauris eu commodo maximus</RichText>
            </View>{' '}
            , ante arcu vestibulum ligula, et scelerisque diam.
          </RichText>
        </View>

        <RichText style={subtitleStyle}>{'<TextInput/>:'}</RichText>
        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          {marker}
          <TextInput style={{margin: 0, padding: 0}}>{texts}</TextInput>
          {marker}
        </View>

        <RichText style={subtitleStyle}>{'<TextInput multiline/>:'}</RichText>
        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          {marker}
          <TextInput multiline={true} style={{margin: 0, padding: 0}}>
            {texts}
          </TextInput>
          {marker}
        </View>
      </View>
    );
  }
}

class TextRenderInfoExample extends React.Component<
  {},
  {
    fontSize: number,
    numberOfTextBlocks: number,
    textMetrics: $ReadOnly<{
      ascender: number,
      capHeight: number,
      descender: number,
      height: number,
      text?: string,
      width: number,
      x: number,
      xHeight: number,
      y: number,
    }>,
  },
> {
  state: {
    fontSize: number,
    numberOfTextBlocks: number,
    textMetrics: $ReadOnly<{
      ascender: number,
      capHeight: number,
      descender: number,
      height: number,
      text?: string,
      width: number,
      x: number,
      xHeight: number,
      y: number,
    }>,
  } = {
    textMetrics: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      capHeight: 0,
      descender: 0,
      ascender: 0,
      xHeight: 0,
    },
    numberOfTextBlocks: 1,
    fontSize: 14,
  };

  render(): React.Node {
    const topOfBox =
      this.state.textMetrics.y +
      this.state.textMetrics.height -
      (this.state.textMetrics.descender + this.state.textMetrics.capHeight);
    return (
      <View>
        <View>
          <View
            style={{
              position: 'absolute',
              left: this.state.textMetrics.x + this.state.textMetrics.width,
              top: topOfBox,
              width: 5,
              height: Math.ceil(
                this.state.textMetrics.capHeight -
                  this.state.textMetrics.xHeight,
              ),
              backgroundColor: 'red',
            }}
          />
          <View
            style={{
              position: 'absolute',
              left: this.state.textMetrics.x + this.state.textMetrics.width,
              top:
                topOfBox +
                (this.state.textMetrics.capHeight -
                  this.state.textMetrics.xHeight),
              width: 5,
              height: Math.ceil(this.state.textMetrics.xHeight),
              backgroundColor: 'green',
            }}
          />
          <RichText
            style={{fontSize: this.state.fontSize}}
            onTextLayout={event => {
              const {lines} = event.nativeEvent;
              if (lines.length > 0) {
                this.setState({textMetrics: lines[lines.length - 1]});
              }
            }}>
            {new Array<string>(this.state.numberOfTextBlocks)
              .fill('A tiny block of text.')
              .join(' ')}
          </RichText>
        </View>
        <RichText
          onPress={() =>
            this.setState({
              numberOfTextBlocks: this.state.numberOfTextBlocks + 1,
            })
          }>
          More text
        </RichText>
        <RichText
          onPress={() => this.setState({fontSize: this.state.fontSize + 1})}>
          Increase size
        </RichText>
        <RichText
          onPress={() => this.setState({fontSize: this.state.fontSize - 1})}>
          Decrease size
        </RichText>
      </View>
    );
  }
}

class TextWithCapBaseBox extends React.Component<
  {children: string, style?: any},
  {
    textMetrics: $ReadOnly<{
      ascender: number,
      capHeight: number,
      descender: number,
      height: number,
      text?: string,
      width: number,
      x: number,
      xHeight: number,
      y: number,
    }>,
  },
> {
  state: {
    textMetrics: $ReadOnly<{
      ascender: number,
      capHeight: number,
      descender: number,
      height: number,
      text?: string,
      width: number,
      x: number,
      xHeight: number,
      y: number,
    }>,
  } = {
    textMetrics: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      capHeight: 0,
      descender: 0,
      ascender: 0,
      xHeight: 0,
    },
  };
  render(): React.Node {
    return (
      <RichText
        onTextLayout={event => {
          const {lines} = event.nativeEvent;
          if (lines.length > 0) {
            this.setState({textMetrics: lines[0]});
          }
        }}
        style={[
          {
            marginTop: Math.ceil(
              -(
                this.state.textMetrics.ascender -
                this.state.textMetrics.capHeight
              ),
            ),
            marginBottom: Math.ceil(-this.state.textMetrics.descender),
          },
          this.props.style,
        ]}>
        {this.props.children}
      </RichText>
    );
  }
}

const examples = [
  {
    title: 'Wrap',
    render: function (): React.Node {
      return (
        <RichText>
          The text should wrap if it goes on multiple lines. See, this is going
          to the next line.
        </RichText>
      );
    },
  },
  {
    title: "Substring Emoji (should only see 'test')",
    render: function (): React.Node {
      return <RichText>{'test🙃'.substring(0, 5)}</RichText>;
    },
  },
  {
    title: 'Transparent Background Color',
    render: function (): React.Node {
      return (
        <RichText style={{backgroundColor: '#00000020', padding: 10}}>
          Text in a gray box!
          <RichText style={{backgroundColor: 'red'}}>
            Another text in a (inline) red box (which is inside the gray box).
          </RichText>
        </RichText>
      );
    },
  },
  {
    title: 'Text metrics',
    render: function (): React.Node {
      return <TextRenderInfoExample />;
    },
  },
  {
    title: 'Text metrics legend',
    render: (): React.Node => <TextLegend />,
  },
  {
    title: 'Baseline capheight box',
    render: (): React.Node => (
      <View style={{backgroundColor: 'red'}}>
        <TextWithCapBaseBox>Some example text.</TextWithCapBaseBox>
      </View>
    ),
  },
  {
    title: 'Padding',
    render: function (): React.Node {
      return (
        <RichText style={{padding: 10}}>
          This text is indented by 10px padding on all sides.
        </RichText>
      );
    },
  },
  {
    title: 'Font Family',
    render: function (): React.Node {
      return (
        <View>
          <RichText style={{fontFamily: Platform.isTV ? 'Times' : 'Cochin'}}>
            Cochin
          </RichText>
          <RichText
            style={{
              fontFamily: Platform.isTV ? 'Times' : 'Cochin',
              fontWeight: 'bold',
            }}>
            Cochin bold
          </RichText>
          <RichText style={{fontFamily: 'Helvetica'}}>Helvetica</RichText>
          <RichText style={{fontFamily: 'Helvetica', fontWeight: 'bold'}}>
            Helvetica bold
          </RichText>
          <RichText style={{fontFamily: Platform.isTV ? 'Courier' : 'Verdana'}}>
            Verdana
          </RichText>
          <RichText
            style={{
              fontFamily: Platform.isTV ? 'Courier' : 'Verdana',
              fontWeight: 'bold',
            }}>
            Verdana bold
          </RichText>
          <RichText style={{fontFamily: 'Unknown Font Family'}}>
            Unknown Font Family
          </RichText>
        </View>
      );
    },
  },
  {
    title: 'Font Size',
    render: function (): React.Node {
      return (
        <View>
          <RichText style={{fontSize: 23}}>Size 23</RichText>
          <RichText style={{fontSize: 8}}>Size 8</RichText>
        </View>
      );
    },
  },
  {
    title: 'Color',
    render: function (): React.Node {
      return (
        <View>
          <RichText style={{color: 'red'}}>Red color</RichText>
          <RichText style={{color: 'blue'}}>Blue color</RichText>
        </View>
      );
    },
  },
  {
    title: 'Font Weight',
    render: function (): React.Node {
      return (
        <View>
          <RichText style={{fontWeight: 'bold'}}>Move fast and be bold</RichText>
          <RichText style={{fontWeight: 'normal'}}>Move fast and be normal</RichText>
          <RichText style={{fontWeight: '900'}}>FONT WEIGHT 900</RichText>
          <RichText style={{fontWeight: '800'}}>FONT WEIGHT 800</RichText>
          <RichText style={{fontWeight: '700'}}>FONT WEIGHT 700</RichText>
          <RichText style={{fontWeight: '600'}}>FONT WEIGHT 600</RichText>
          <RichText style={{fontWeight: '500'}}>FONT WEIGHT 500</RichText>
          <RichText style={{fontWeight: '400'}}>FONT WEIGHT 400</RichText>
          <RichText style={{fontWeight: '300'}}>FONT WEIGHT 300</RichText>
          <RichText style={{fontWeight: '200'}}>FONT WEIGHT 200</RichText>
          <RichText style={{fontWeight: '100'}}>FONT WEIGHT 100</RichText>
          <RichText style={{fontWeight: 900}}>FONT WEIGHT 900</RichText>
          <RichText style={{fontWeight: 800}}>FONT WEIGHT 800</RichText>
          <RichText style={{fontWeight: 700}}>FONT WEIGHT 700</RichText>
          <RichText style={{fontWeight: 600}}>FONT WEIGHT 600</RichText>
          <RichText style={{fontWeight: 500}}>FONT WEIGHT 500</RichText>
          <RichText style={{fontWeight: 400}}>FONT WEIGHT 400</RichText>
          <RichText style={{fontWeight: 300}}>FONT WEIGHT 300</RichText>
          <RichText style={{fontWeight: 200}}>FONT WEIGHT 200</RichText>
          <RichText style={{fontWeight: 100}}>FONT WEIGHT 100</RichText>
        </View>
      );
    },
  },
  {
    title: 'Font Style',
    render: function (): React.Node {
      return (
        <View>
          <RichText style={{fontStyle: 'normal'}}>Normal text</RichText>
          <RichText style={{fontStyle: 'italic'}}>Italic text</RichText>
        </View>
      );
    },
  },
  {
    title: 'Selectable',
    render: function (): React.Node {
      return (
        <View>
          <RichText selectable={true}>
            This text is <RichText style={{fontWeight: 'bold'}}>selectable</RichText> if
            you click-and-hold.
          </RichText>
        </View>
      );
    },
  },
  {
    title: 'Text Decoration',
    render: function (): React.Node {
      return (
        <View>
          <RichText
            style={{
              textDecorationLine: 'underline',
              textDecorationStyle: 'solid',
            }}>
            Solid underline
          </RichText>
          <RichText
            style={{
              textDecorationLine: 'underline',
              textDecorationStyle: 'double',
              textDecorationColor: '#ff0000',
            }}>
            Double underline with custom color
          </RichText>
          <RichText
            style={{
              textDecorationLine: 'underline',
              textDecorationStyle: 'dashed',
              textDecorationColor: '#9CDC40',
            }}>
            Dashed underline with custom color
          </RichText>
          <RichText
            style={{
              textDecorationLine: 'underline',
              textDecorationStyle: 'dotted',
              textDecorationColor: 'blue',
            }}>
            Dotted underline with custom color
          </RichText>
          <RichText style={{textDecorationLine: 'none'}}>None textDecoration</RichText>
          <RichText
            style={{
              textDecorationLine: 'line-through',
              textDecorationStyle: 'solid',
            }}>
            Solid line-through
          </RichText>
          <RichText
            style={{
              textDecorationLine: 'line-through',
              textDecorationStyle: 'double',
              textDecorationColor: '#ff0000',
            }}>
            Double line-through with custom color
          </RichText>
          <RichText
            style={{
              textDecorationLine: 'line-through',
              textDecorationStyle: 'dashed',
              textDecorationColor: '#9CDC40',
            }}>
            Dashed line-through with custom color
          </RichText>
          <RichText
            style={{
              textDecorationLine: 'line-through',
              textDecorationStyle: 'dotted',
              textDecorationColor: 'blue',
            }}>
            Dotted line-through with custom color
          </RichText>
          <RichText style={{textDecorationLine: 'underline line-through'}}>
            Both underline and line-through
          </RichText>
        </View>
      );
    },
  },
  {
    title: 'Nested',
    description: ('Nested text components will inherit the styles of their ' +
      'parents (only backgroundColor is inherited from non-Text parents).  ' +
      '<RichText> only supports other <RichText> and raw text (strings) as children.': string),
    render: function (): React.Node {
      return (
        <View>
          <RichText>
            (Normal text,
            <RichText style={{fontWeight: 'bold'}}>
              (and bold
              <RichText style={{fontSize: 11, color: '#527fe4'}}>
                (and tiny inherited bold blue)
              </RichText>
              )
            </RichText>
            )
          </RichText>
          <RichText style={{opacity: 0.7}}>
            (opacity
            <RichText>
              (is inherited
              <RichText style={{opacity: 0.7}}>
                (and accumulated
                <RichText style={{backgroundColor: '#ffaaaa'}}>
                  (and also applies to the background)
                </RichText>
                )
              </RichText>
              )
            </RichText>
            )
          </RichText>
          <RichText style={{fontSize: 12}}>
            <Entity>Entity Name</Entity>
          </RichText>
        </View>
      );
    },
  },
  {
    title: 'Text Align',
    render: function (): React.Node {
      return (
        <View>
          <RichText>auto (default) - english LTR</RichText>
          <RichText>
            {'\u0623\u062D\u0628 \u0627\u0644\u0644\u063A\u0629 ' +
              '\u0627\u0644\u0639\u0631\u0628\u064A\u0629 auto (default) - arabic ' +
              'RTL'}
          </RichText>
          <RichText style={{textAlign: 'left'}}>
            left left left left left left left left left left left left left
            left left
          </RichText>
          <RichText style={{textAlign: 'center'}}>
            center center center center center center center center center
            center center
          </RichText>
          <RichText style={{textAlign: 'right'}}>
            right right right right right right right right right right right
            right right
          </RichText>
          <RichText style={{textAlign: 'justify'}}>
            justify: this text component{"'"}s contents are laid out with
            "textAlign: justify" and as you can see all of the lines except the
            last one span the available width of the parent container.
          </RichText>
        </View>
      );
    },
  },
  {
    title: 'Letter Spacing',
    render: function (): React.Node {
      return (
        <View>
          <RichText style={{letterSpacing: 0}}>letterSpacing = 0</RichText>
          <RichText style={{letterSpacing: 2, marginTop: 5}}>
            letterSpacing = 2
          </RichText>
          <RichText style={{letterSpacing: 9, marginTop: 5}}>
            letterSpacing = 9
          </RichText>
          <View style={{flexDirection: 'row'}}>
            <RichText
              style={{
                fontSize: 12,
                letterSpacing: 2,
                backgroundColor: 'fuchsia',
                marginTop: 5,
              }}>
              With size and background color
            </RichText>
          </View>
          <RichText style={{letterSpacing: -1, marginTop: 5}}>
            letterSpacing = -1
          </RichText>
          <RichText
            style={{
              letterSpacing: 3,
              backgroundColor: '#dddddd',
              marginTop: 5,
            }}>
            [letterSpacing = 3]
            <RichText style={{letterSpacing: 0, backgroundColor: '#bbbbbb'}}>
              [Nested letterSpacing = 0]
            </RichText>
            <RichText style={{letterSpacing: 6, backgroundColor: '#eeeeee'}}>
              [Nested letterSpacing = 6]
            </RichText>
          </RichText>
        </View>
      );
    },
  },
  {
    title: 'Spaces',
    render: function (): React.Node {
      return (
        <RichText>
          A {'generated'} {'string'} and some &nbsp;&nbsp;&nbsp; spaces
        </RichText>
      );
    },
  },
  {
    title: 'Line Height',
    render: function (): React.Node {
      return (
        <RichText>
          <RichText style={{lineHeight: 35}}>
            A lot of space between the lines of this long passage that should
            wrap once.
          </RichText>
        </RichText>
      );
    },
  },
  {
    title: 'Empty Text',
    description: "It's ok to have Text with zero or null children.",
    render: function (): React.Node {
      return <RichText />;
    },
  },
  {
    title: 'Toggling Attributes',
    render: function (): React.Element<any> {
      return <AttributeToggler />;
    },
  },
  {
    title: 'backgroundColor attribute',
    description: 'backgroundColor is inherited from all types of views.',
    render: function (): React.Node {
      return (
        <RichText style={{backgroundColor: 'yellow'}}>
          Yellow container background,
          <RichText style={{backgroundColor: '#ffaaaa'}}>
            {' '}
            red background,
            <RichText style={{backgroundColor: '#aaaaff'}}>
              {' '}
              blue background,
              <RichText>
                {' '}
                inherited blue background,
                <RichText style={{backgroundColor: '#aaffaa'}}>
                  {' '}
                  nested green background.
                </RichText>
              </RichText>
            </RichText>
          </RichText>
        </RichText>
      );
    },
  },
  {
    title: 'numberOfLines attribute',
    render: function (): React.Node {
      return (
        <View>
          <RichText numberOfLines={1}>
            Maximum of one line, no matter how much I write here. If I keep
            writing, it{"'"}ll just truncate after one line.
          </RichText>
          <RichText numberOfLines={2} style={{marginTop: 20}}>
            Maximum of two lines, no matter how much I write here. If I keep
            writing, it{"'"}ll just truncate after two lines.
          </RichText>
          <RichText style={{marginTop: 20}}>
            No maximum lines specified, no matter how much I write here. If I
            keep writing, it{"'"}ll just keep going and going.
          </RichText>
        </View>
      );
    },
  },
  {
    title: 'Text highlighting (tap the link to see highlight)',
    render: function (): React.Node {
      return (
        <View>
          <RichText>
            Lorem ipsum dolor sit amet,{' '}
            <RichText
              suppressHighlighting={false}
              style={{
                backgroundColor: 'white',
                textDecorationLine: 'underline',
                color: 'blue',
              }}
              onPress={() => null}>
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud
            </RichText>{' '}
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </RichText>
        </View>
      );
    },
  },
  {
    title: 'allowFontScaling attribute',
    render: function (): React.Node {
      return (
        <View>
          <RichText>
            By default, text will respect Text Size accessibility setting on
            iOS. It means that all font sizes will be increased or decreased
            depending on the value of Text Size setting in{' '}
            <RichText style={{fontWeight: 'bold'}}>
              Settings.app - Display & Brightness - Text Size
            </RichText>
          </RichText>
          <RichText style={{marginTop: 10}}>
            You can disable scaling for your Text component by passing {'"'}
            allowFontScaling={'{'}false{'}"'} prop.
          </RichText>
          <RichText allowFontScaling={false} style={{marginTop: 20, fontSize: 15}}>
            This text will not scale.{' '}
            <RichText style={{fontSize: 15}}>
              This text also won't scale because it inherits "allowFontScaling"
              from its parent.
            </RichText>
          </RichText>
        </View>
      );
    },
  },
  {
    title: 'Inline views',
    render: (): React.Node => <TextInlineView.Basic />,
  },
  {
    title: 'Inline image/view clipped by <RichText>',
    render: (): React.Node => <TextInlineView.ClippedByText />,
  },
  {
    title: 'Relayout inline image',
    render: (): React.Node => <TextInlineView.ChangeImageSize />,
  },
  {
    title: 'Relayout inline view',
    render: (): React.Node => <TextInlineView.ChangeViewSize />,
  },
  {
    title: 'Relayout nested inline view',
    render: (): React.Node => <TextInlineView.ChangeInnerViewSize />,
  },
  {
    title: 'Text shadow',
    render: function (): React.Node {
      return (
        <View>
          <RichText
            style={{
              fontSize: 20,
              textShadowOffset: {width: 2, height: 2},
              textShadowRadius: 1,
              textShadowColor: '#00cccc',
            }}>
            Demo text shadow
          </RichText>
        </View>
      );
    },
  },
  {
    title: 'Ellipsize mode',
    render: function (): React.Node {
      return (
        <View>
          <RichText numberOfLines={1}>
            This very long text should be truncated with dots in the end.
          </RichText>
          <RichText ellipsizeMode="middle" numberOfLines={1}>
            This very long text should be truncated with dots in the middle.
          </RichText>
          <RichText ellipsizeMode="head" numberOfLines={1}>
            This very long text should be truncated with dots in the beginning.
          </RichText>
          <RichText ellipsizeMode="clip" numberOfLines={1}>
            This very looooooooooooooooooooooooooooong text should be clipped.
          </RichText>
        </View>
      );
    },
  },
  {
    title: 'Font variants',
    render: function (): React.Node {
      return (
        <View>
          <RichText style={{fontVariant: ['small-caps']}}>Small Caps{'\n'}</RichText>
          <RichText
            style={{
              fontFamily: Platform.isTV ? 'Times' : 'Hoefler Text',
              fontVariant: ['oldstyle-nums'],
            }}>
            Old Style nums 0123456789{'\n'}
          </RichText>
          <RichText
            style={{
              fontFamily: Platform.isTV ? 'Times' : 'Hoefler Text',
              fontVariant: ['lining-nums'],
            }}>
            Lining nums 0123456789{'\n'}
          </RichText>
          <RichText style={{fontVariant: ['tabular-nums']}}>
            Tabular nums{'\n'}
            1111{'\n'}
            2222{'\n'}
          </RichText>
          <RichText style={{fontVariant: ['proportional-nums']}}>
            Proportional nums{'\n'}
            1111{'\n'}
            2222{'\n'}
          </RichText>
        </View>
      );
    },
  },
  {
    title: 'Nested content',
    render: function (): React.Node {
      // iOS-only because it relies on inline views being able to size to content.
      // Android's implementation requires that a width and height be specified
      // on the inline view.
      return (
        <RichText>
          This text has a view
          <View style={{borderColor: 'red', borderWidth: 1}}>
            <RichText style={{borderColor: 'blue', borderWidth: 1}}>which has</RichText>
            <RichText style={{borderColor: 'green', borderWidth: 1}}>
              another text inside.
            </RichText>
            <RichText style={{borderColor: 'yellow', borderWidth: 1}}>
              And moreover, it has another view
              <View style={{borderColor: 'red', borderWidth: 1}}>
                <RichText style={{borderColor: 'blue', borderWidth: 1}}>
                  with another text inside!
                </RichText>
              </View>
            </RichText>
          </View>
          Because we need to go deeper.
        </RichText>
      );
    },
  },
  {
    title: 'Dynamic Font Size Adjustment',
    render: function (): React.Element<any> {
      return <AdjustingFontSize />;
    },
  },
  {
    title: 'Text Align with RTL',
    render: function (): React.Node {
      return <TextAlignRTLExample />;
    },
  },
  {
    title: "Text `alignItems: 'baseline'` style",
    render: function (): React.Node {
      return <TextBaseLineLayoutExample />;
    },
  },
  {
    title: 'Transform',
    render: function (): React.Node {
      return (
        <View>
          <RichText style={{textTransform: 'uppercase'}}>
            This text should be uppercased.
          </RichText>
          <RichText style={{textTransform: 'lowercase'}}>
            This TEXT SHOULD be lowercased.
          </RichText>
          <RichText style={{textTransform: 'capitalize'}}>
            This text should be CAPITALIZED.
          </RichText>
          <RichText>
            Capitalize a date:
            <RichText style={{textTransform: 'capitalize'}}>
              the 9th of november, 1998
            </RichText>
          </RichText>
          <RichText>
            Capitalize a 2 digit date:
            <RichText style={{textTransform: 'capitalize'}}>
              the 25th of december
            </RichText>
          </RichText>
          <RichText style={{textTransform: 'capitalize'}}>
            Mixed: <RichText style={{textTransform: 'uppercase'}}>uppercase </RichText>
            <RichText style={{textTransform: 'lowercase'}}>LoWeRcAsE </RichText>
            <RichText style={{textTransform: 'capitalize'}}>
              capitalize each word
            </RichText>
          </RichText>
          <RichText>
            Should be "ABC":
            <RichText style={{textTransform: 'uppercase'}}>
              a<RichText>b</RichText>c
            </RichText>
          </RichText>
          <RichText>
            Should be "AbC":
            <RichText style={{textTransform: 'uppercase'}}>
              a<RichText style={{textTransform: 'none'}}>b</RichText>c
            </RichText>
          </RichText>
        </View>
      );
    },
  },
  {
    title: 'Selectable Text',
    render: function (): React.Node {
      return (
        <View>
          <RichText style={{userSelect: 'auto'}}>Text element is selectable</RichText>
        </View>
      );
    },
  },
  {
    title: 'Line Break Strategy',
    render: function (): React.Node {
      const lineBreakStrategy = ['none', 'standard', 'hangul-word', 'push-out'];
      const textByCode = {
        en: 'lineBreakStrategy lineBreakStrategy lineBreakStrategy lineBreakStrategy',
        ko: '한글개행 한글개행 한글개행 한글개행 한글개행 한글개행 한글개행 한글개행',
        ja: 'かいぎょう かいぎょう かいぎょう かいぎょう かいぎょう かいぎょう',
        cn: '改行 改行 改行 改行 改行 改行 改行 改行 改行 改行 改行 改行',
      };

      return (
        <View>
          {lineBreakStrategy.map(strategy => {
            return (
              <View key={strategy} style={{marginBottom: 12}}>
                <RichText
                  style={{
                    backgroundColor: 'lightgrey',
                  }}>{`Strategy: ${strategy}`}</RichText>
                {Object.keys(textByCode).map(code => {
                  return (
                    <View key={code}>
                      <RichText style={{fontWeight: 'bold'}}>{`[${code}]`}</RichText>
                      <RichText lineBreakStrategyIOS={strategy}>
                        {textByCode[code]}
                      </RichText>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
      );
    },
  },
  {
    title: 'Dynamic Type (iOS only)',
    render: function (): React.Node {
      const boldStyle = {fontWeight: 'bold'};
      const boxStyle = {
        borderWidth: 1,
        padding: 8,
        margin: 8,
      };
      return (
        <View style={{marginTop: 10, marginBottom: 10}}>
          <RichText>
            Adjust text size in Accessibility settings and watch how the font
            sizes change relative to each other.
          </RichText>
          <View style={boxStyle}>
            <RichText style={boldStyle}>With `dynamicTypeRamp`:</RichText>
            <RichText style={{fontSize: 34}} dynamicTypeRamp="largeTitle">
              Large Title
            </RichText>
            <RichText style={{fontSize: 28}} dynamicTypeRamp="title1">
              Title
            </RichText>
            <RichText style={{fontSize: 22}} dynamicTypeRamp="title2">
              Title 2
            </RichText>
            <RichText style={{fontSize: 20}} dynamicTypeRamp="title3">
              Title 3
            </RichText>
            <RichText style={{fontSize: 17}} dynamicTypeRamp="body">
              Body
            </RichText>
          </View>
          <View style={boxStyle}>
            <RichText style={boldStyle}>Without `dynamicTypeRamp`:</RichText>
            <RichText style={{fontSize: 34}}>Large Title</RichText>
            <RichText style={{fontSize: 28}}>Title</RichText>
            <RichText style={{fontSize: 22}}>Title 2</RichText>
            <RichText style={{fontSize: 20}}>Title 3</RichText>
            <RichText style={{fontSize: 17}}>Body</RichText>
          </View>
        </View>
      );
    },
  },
];

module.exports = ({
  title: 'RichText',
  documentationURL: 'https://reactnative.dev/docs/rich-text',
  category: 'Basic',
  description: 'Enhanced Text component for rendering styled text.',
  displayName: 'RichTextExample',
  examples,
}: RNTesterModule);
