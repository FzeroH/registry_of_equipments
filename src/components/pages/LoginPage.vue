<template>
  <div class="login-form"> 
    <h2>Войти</h2>
    <h3 v-if="error" class="error">{{error}}</h3>
    <h3 v-if="succsess" class="succsess">{{succsess}}</h3>
    <input type="text" placeholder="Логин" v-model="username">
    <input type="password" placeholder="Пароль" v-model="password">
    <div class="button-block">
        <button @click="login">Войти</button>
        <!-- <button @click="registration">Зарегистрироваться</button> -->
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import EquipmentService from '@/api/EquipmentService';
import { useRouter } from 'vue-router';
export default {
    name: 'LoginPage',

    setup() {
        const username = ref('');
        const password = ref('');
        const error = ref('');
        const succsess = ref('');
        const router = useRouter();

        const login = () => {
            succsess.value = '';
            error.value = '';
            if (username.value && password.value) {
                EquipmentService.login(username.value, password.value)
                .then(res => {
                    localStorage.setItem('user_id',res.user_id)
                    localStorage.setItem('role_id',res.role_id)
                    router.push('/main')
                })
                .catch(e => {
                    error.value = e.response.data.error
                })
            } 
            else {
                return
            }
        }

        const registration = () => {
            succsess.value = '';
            error.value = '';
            if (username.value && password.value) {
                EquipmentService.registration(username.value, password.value)
                .then(res => {
                    succsess.value = res.message
                })
                .catch(e => {
                    error.value = e.response.data.error
                })
            }
            else {
                return
            }
        }

        return { username, password, error, succsess, login, registration }
    }
}
</script>

<style scoped>
    .login-form {
        display: flex;
        flex-direction: column;
        margin: 250px auto;
        max-width: 50%;
    }

    h2, h3 {
        font-weight: bold;
        text-align: center;
    }

    h2 {
        font-size: 20px;
        color: #1c274c;
        margin-bottom: 30px;
    }

    h3 {
        font-size: 16px;
        margin-bottom: 10px;
    }

    .error {
        color: red;
    }

    .succsess {
        color: green;
    }
    
    input {
        outline: none;
        font-size: 16px;
        padding: 10px;
    }

    input[type="password"] {
        margin-top: 10px;
    }

    .button-block {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-top: 30px;
    }

    button {
        background: #1c274c;
        outline: none;
        border: none;
        border-radius: 10px;
        color: white;
        padding: 10px 20px;
        transition: 0.5s ease;
    }

    button:hover {
        cursor: pointer;
        transition: 0.5 ease;
        background: #314483;
    }
</style>