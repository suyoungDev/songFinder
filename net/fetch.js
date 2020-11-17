import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';;

async function fetch(url){
  let result = await AsyncStorage.getItem(url);
  let timeStamp = await AsyncStorage.getItem('T'+url);
  if (result !== null){
    // 현재 시간과 타임스탬프 비교
    timeStamp = Number(timeStamp);
    const now = new Date().getTime();
    if (now - timeStamp < 86400000){ // 86400000밀리초 = 만 1일
      return JSON.parse(result);
    }
  }
  // 하루 초과시 데이터 다시 불러오기
  const response = await axios.get(url);
  result = response.data;
  AsyncStorage.setItem(url, JSON.stringify(result));
  AsyncStorage.setItem('T'+url, new Date().getTime().toString());
  return result;
}

export default fetch;