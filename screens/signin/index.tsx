import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import Svg, { Image as SvgImage, Circle, ClipPath } from "react-native-svg";

import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

const { width, height } = Dimensions.get("window");
const {
  Value,
  block,
  cond,
  event,
  eq,
  set,
  Clock,
  interpolate,
  Extrapolate,
  concat,
} = Animated;

import { runTiming } from "./runTiming";
import { firebaseAuth } from "../../environment/config";

export default class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
    };

    this.buttonOpacity = new Value(1);

    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            ),
          ]),
      },
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
            ),
          ]),
      },
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3 - 50, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputZIndex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP,
    });
    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP,
    });
    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.rotateX = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP,
    });
  }
  render() {
    return (
      <KeyboardAvoidingView enabled behavior="padding" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              justifyContent: "flex-end",
            }}
          >
            <Animated.View
              style={{
                ...StyleSheet.absoluteFill,
                transform: [{ translateY: this.bgY }],
              }}
            >
              <Svg height={height + 50} width={width}>
                <ClipPath id="clip">
                  <Circle r={height + 50} cx={width / 2} />
                </ClipPath>
                <SvgImage
                  href={require("../../assets/images/background.jpg")}
                  width={width}
                  height={height + 50}
                  preserveAspectRatio="xMidyMid slice"
                  clipPath="url(#clip)"
                />
              </Svg>
            </Animated.View>
            <View
              style={{
                height: height / 3,
                justifyContent: "center",
              }}
            >
              <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                <Animated.View
                  style={{
                    opacity: this.buttonOpacity,
                    transform: [{ translateY: this.buttonY }],
                  }}
                >
                  <Button>SIGN IN</Button>
                </Animated.View>
              </TapGestureHandler>
              <Animated.View
                style={{
                  opacity: this.buttonOpacity,
                  transform: [{ translateY: this.buttonY }],
                }}
              >
                <Button
                  style={{ backgroundColor: "#2e71dc" }}
                  textStyle={{ color: "white" }}
                  pressedColor="#2355a4"
                >
                  SIGN IN WITH FACEBOOK
                </Button>
              </Animated.View>
              <Animated.View
                style={[
                  styles.formSection,
                  {
                    height: height / 3,
                    ...StyleSheet.absoluteFill,

                    zIndex: this.textInputZIndex,
                    opacity: this.textInputOpacity,
                    transform: [{ translateY: this.textInputY }],
                  },
                ]}
              >
                <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                  <Animated.View style={styles.closeBtn}>
                    <Animated.Text
                      style={{
                        fontSize: 15,
                        transform: [{ rotate: concat(this.rotateX, "deg") }],
                      }}
                    >
                      X
                    </Animated.Text>
                  </Animated.View>
                </TapGestureHandler>

                <TextInput
                  placeholder="EMAIL"
                  placeholderTextColor="black"
                  keyboardType="email-address"
                  value={this.state.email}
                  onChangeText={(text) =>
                    this.setState({ ...this.state, email: text })
                  }
                />
                <TextInput
                  placeholder="PASSWORD"
                  placeholderTextColor="black"
                  secureTextEntry={true}
                  value={this.state.password}
                  onChangeText={(text) =>
                    this.setState({ ...this.state, password: text })
                  }
                />
                <Button
                  style={{
                    shadowOffset: { width: 2, height: 2 },
                    shadowColor: "black",
                    shadowOpacity: 0.4,
                  }}
                >
                  SIGN IN
                </Button>
              </Animated.View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  formSection: {
    top: null,
    justifyContent: "center",
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  closeBtn: {
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -20,
    left: width / 2 - 20,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.4,
  },
});
