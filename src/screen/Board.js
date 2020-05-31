import * as React from 'react';
import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {
  Container,
  Header,
  Left,
  Button,
  Right,
  Icon,
  Body,
  Title,
  Content,
  Form,
  Item,
  Text,
  Input,
} from 'native-base';
import {
  statusbarColor,
  commonBackground,
  commonBlue,
  greyWithAlpha,
} from './../styles/commonColors';
import ImagePicker from 'react-native-image-crop-picker';
import RNBottomActionSheet from 'react-native-bottom-action-sheet';
import RNFetchBlob from 'rn-fetch-blob';
import {rootURL} from './../urls.json';
import {connect} from 'react-redux';

class Board extends React.Component {
  state = {
    uri: undefined,
    name: '',
    about: '',
  };

  uploadData = () => {
    const {name, about, uri} = this.state;

    if (name.trim().length === 0) {
      return Alert.alert('Please fill out the form');
    }

    const photo = uri === undefined ? undefined : RNFetchBlob.wrap(uri);

    RNFetchBlob.fetch(
      'PUT',
      `${rootURL}/board`,
      {
        Authorization: 'Bearer ' + this.props.token,
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'header',
          filename: 'header.png',
          data: photo,
        },
        {
          name: 'info',
          data: JSON.stringify({
            name,
            about,
          }),
        },
      ],
    )
      .then((response) => {
        if (response.respInfo.status === 200) {
          return this.props.navigation.push('home');
        }
      })
      .catch((e) => console.log(e));
  };

  imageOption = () => {
    let SheetView = RNBottomActionSheet.SheetView;

    SheetView.Show({
      title: 'Awesome!',
      items: [
        {
          title: 'Pick from Gallery',
          value: 'ga',
        },
        {
          title: 'Take Photo',
          value: 'ph',
        },
      ],
      theme: 'dark',
      selection: 3,
      onSelection: (index, value) => {
        // value is optional
        if (value === 'ga') {
          ImagePicker.openPicker({
            cropping: true,
            height: 300,
            width: Dimensions.get('window').width,
          }).then((img) => this.setState({uri: img.path}));
        } else {
          ImagePicker.openCamera({
            cropping: true,
            height: 300,
            width: Dimensions.get('window').width,
          }).then((img) => this.setState({uri: img.path}));
        }
      },
    });
  };

  render() {
    const {imageChild, image} = styles;
    return (
      <Container style={{backgroundColor: commonBackground}}>
        <Header
          style={{backgroundColor: '#fff'}}
          androidStatusBarColor={statusbarColor}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={{color: commonBlue}} />
            </Button>
          </Left>
          <Body>
            <Title style={{color: '#000'}}>Create Board</Title>
          </Body>
          <Right>
            <Button
              bordered
              style={{borderColor: commonBlue}}
              onPress={() => Alert.alert('Success')}>
              <Text style={{color: commonBlue}}>Create</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <ImageBackground style={image} source={{uri: this.state.uri}}>
            <TouchableOpacity style={imageChild} onPress={this.imageOption}>
              <Icon name="camera" style={{color: '#fff'}} />
            </TouchableOpacity>
          </ImageBackground>
          <Form style={{marginTop: 20}}>
            <Item>
              <Input
                placeholder="Board Name"
                value={this.state.name}
                onChangeText={(name) => this.setState({name})}
              />
            </Item>
            <Item>
              <Input
                placeholder="What's your board all about?"
                multiline={true}
                value={this.state.about}
                numberOfLines={4}
                onChangeText={(about) => this.setState({about})}
              />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: '100%',
    backgroundColor: commonBlue,
  },
  imageChild: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: greyWithAlpha(0.5),
  },
});

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
});

export default connect(mapStateToProps)(Board);
