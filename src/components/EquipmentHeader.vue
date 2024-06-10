<template>
    <div class="tables-container">
      <router-link :to="'/main'" 
      exact active-class="active-link" 
      class="link">Оборудование</router-link>
      <router-link :to="'/division'" 
      exact active-class="active-link" 
      class="link">Структурные подразделения</router-link>
      <router-link :to="'/responsibles'" 
      exact active-class="active-link" 
      class="link">Мат. ответственные</router-link>
      <router-link :to="'/users'" 
      exact active-class="active-link" 
      class="link">Пользователи</router-link>
      <router-link :to="'/status'" 
      exact active-class="active-link" 
      class="link">Статус оборудования</router-link>
    <button @click="logout" class="logout">Выход</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EquipmentHeader',
    
    setup() {
      const logout = () => {
        localStorage.clear()
        window.location.reload();
      }
  
      return { logout } 
    }
  }
  </script>
  
  <style scoped>
   
  .tables-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-content: center;
      margin-top: 20px;
    }
  
  .link {
      margin-left:15px;
      margin-bottom: ;
      color: #1c274c;
      text-decoration: none;
      transition: 100ms ease;
    }
  
    .link:hover {
      font-weight: bold;
      transition: 100ms ease;
    }
      
    .active-link {
      font-weight: bold;
      text-decoration: underline;
    }
  
    .logout {
      align-self: flex-end;
      color: #1c274c;
      outline: none;
      border: none;
      margin-left: 20px;
      background: none;
      transition: 200ms ease;
  
    }
  
    .logout:hover {
      cursor: pointer;
      font-weight: bold;
      transition: 200ms ease;
    }
  </style>
  