import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Asset } from "expo-asset";
import { AppLoading } from "expo";

import SignIn from "./screens/signin/index";

function cacheImages(images: any) {
  return images.map((image: any) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require("./assets/images/background.jpg"),
    ]);
    await Promise.all([...imageAssets]);
  }

  render() {
    return (
      <>
        {this.state.isReady ? (
          <SignIn />
        ) : (
          <AppLoading
            startAsync={this._loadAssetsAsync}
            onFinish={() => this.setState({ isReady: true })}
            onError={console.warn}
          />
        )}
      </>
    );
  }
}
