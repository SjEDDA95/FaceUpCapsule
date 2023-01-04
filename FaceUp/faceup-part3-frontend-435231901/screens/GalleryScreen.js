import React from 'react';
import { ScrollView } from 'react-native';
import { Card, Badge, Text } from 'react-native-elements';

import { connect } from 'react-redux';

function GalleryScreen(props) {
  var cardList = props.pictureList.map((data, i) => {

    var badgeGender;
    if (data.gender) {
      badgeGender = <Badge status="success" value={data.gender} />
    }
    var badgeAge;
    if (data.age) {
      badgeAge = <Badge status="success" value={data.age} />;
    }

    return (
      <Card key={i}>
        <Card.Image
          style={{ width: '100%', height: 170, marginBottom: 10 }}
          source={{ uri: data.url }}
        />
        {badgeGender}
        {badgeAge}
      </Card>
    );
  });

  return (
    <ScrollView style={{ marginTop: 25 }}>
      <Text h4 style={{ textAlign: 'center' }}>{props.pseudo}'s Gallery</Text>
      {cardList}
    </ScrollView>
  );
}

function mapStateToProps(state) {
  return { pictureList: state.pictureList, pseudo: state.pseudo };
}

export default connect(
  mapStateToProps,
  null,
)(GalleryScreen);
