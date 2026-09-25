import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TermsAndConditionsPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>
      <Text style={styles.paragraph}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, sapien sit amet pharetra tristique, lectus nulla commodo nunc, non facilisis ante mauris non ex. Donec maximus rhoncus justo vel imperdiet. Nullam tristique, mi eget rhoncus vulputate, est quam fringilla nibh, vitae ullamcorper eros libero a urna. In eget justo leo. Nam pharetra nunc ut mi malesuada, id bibendum ex sagittis. Vestibulum efficitur vestibulum enim quis malesuada. Donec luctus enim sit amet ex feugiat, vel facilisis libero aliquet. Maecenas consectetur ligula ut dapibus semper. Aliquam vitae metus dignissim, commodo lorem quis, dignissim elit. Praesent dignissim, leo vel laoreet interdum, odio turpis venenatis nibh, sed faucibus eros orci at dolor. Nullam in purus ut nisi elementum dignissim a ac erat.
      </Text>
      <Text style={styles.paragraph}>
        Morbi eu ligula massa. Nullam sagittis fringilla velit quis finibus. Fusce malesuada turpis ac luctus bibendum. Etiam semper faucibus quam ut eleifend. Nunc tristique, nibh vitae dignissim pretium, lorem nisl imperdiet ex, in mollis sapien nisi ut lacus. Vivamus vitae nulla varius, molestie mi vel, malesuada eros. Aliquam sed dui in sapien suscipit euismod. Nam bibendum rhoncus quam, a feugiat justo consequat eu. Proin blandit, odio nec tincidunt efficitur, est velit vulputate turpis, non ultrices sapien magna sit amet nulla. Praesent rhoncus, felis vel ullamcorper suscipit, elit neque suscipit nibh, nec lobortis tortor ex quis mauris. Suspendisse a risus at enim faucibus gravida. In porttitor ultrices mauris, vel interdum quam maximus sit amet. Nulla sagittis urna vitae arcu tincidunt, eu fringilla ante finibus.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default TermsAndConditionsPage;
