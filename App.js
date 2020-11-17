import React from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import fetch from './net/fetch';

const Container = styled.SafeAreaView`
  flex: 1;
`;
const Contents = styled.ScrollView`
  flex: 1;
  margin: 20px;
`;
const Row = styled.View`
  flex-direction: row;
  padding: 14px 12px;
`;
const Input = styled.TextInput`
  flex: 1;
  border: 1px solid #e5e5e5;
  padding: 0;
`;
const Button = styled.Button`
  color: #303f9f;

`;
const ListItem = styled.TouchableOpacity`
  padding: 6px 12px;
  border-bottom-color: #e5e5e5;
  border-bottom-width: 1px;
`;
const Label = styled.Text`
  font-size: 18px;
  color: #303f9f;
`;

function App(){
  const [keyword, setKeyword] = React.useState('');
  const [list, setList] = React.useState([]);
  const search = React.useCallback( () => {
    fetch(`https://api.manana.kr/karaoke/singer/${keyword}.json`)
    .then(data => {
      setList(data);
    })
    .catch(error => {alert(error)});
  },[keyword]);

  return(
    <Container>
      <Row>
        <Input value={keyword} onChangeText={value => setKeyword(value)} />
        <Button title='검색' color="#49599a" onPress={search}/>
      </Row>
      <Contents>
        {list.map(item => (
          <ListItem key={item.brand + item.no}>
          <Label>{`${item.brand} / [${item.no}] / ${item.title}`}</Label>
          </ListItem>
        ))}
      </Contents>
    </Container>
  )
};


export default App;
