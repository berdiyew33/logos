<script setup>
  import { ref } from "vue";

  import axios from "axios";
  const data = ref();
  const logoIndex = ref(['visible']);
  const logoCount = ref(0);
  function like(e, s) {
    e = e.toLowerCase();
    s = s.toLowerCase();

    for (let i = 0; i < s.length; i++) {
      if ((i < e.length)&&(s[i] !== e[i])) {
        return false;
      }
    }

    return true;
  }
  
  function search(e) {
    let countOfVisible = 0;
    if (logoCount.value > logoIndex.value.length) {
      for (let i = 0; i < logoCount.value - logoIndex.value.length; i++) {
        logoIndex.value.push('visible');
      }
    }
    Object.keys(data.value.records).forEach((element, i) => {
      if (like(e, element)) {
        logoIndex.value[i] = 'visible';
        countOfVisible++;
      } else {
        logoIndex.value[i] = 'hidden';
      }
      console.log(logoIndex.value[i]);
    });
    logoCount.value = 0;
  }
  axios.get('http://logotypes.dev/all').then(res => {
    data.value = res.data;
    search('');
  });
</script>

<template>
  <input type="text" @input="search($event.target.value)" placeholder="Search..." />
  <div class="logo-container">
    <div v-for="(d, i) in Object.values(data.records)"><div  v-if="logoIndex[i] == 'visible'"><div>{{ i }}.  {{ d[0].name }}</div> <img :src="d[0].logo" /></div></div>
  </div>
  
</template>

<style>
.logo-container > div > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
}
.logo-container {
  position: absolute;
  top: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-left: 20px;
}
.visible {
  display: flex;
}
.hidden {
  display: none;

}
input{
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Times ne roman';
  font-size: 24px;
  border-radius: 10px;
  border-width: 2px;
}
</style>


