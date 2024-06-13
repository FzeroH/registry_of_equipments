<template>
    <div class="modal" v-if="showModal">
        <div class="modal-content">
            <h2 v-if="isNewUser">Добавить пользователя</h2>
            <h2 v-else>Изменить данные пользователя</h2>
            
            <label v-if="isNewUser" for="login">
                <input id="login" 
                type="text" 
                placeholder="Введите логин пользователя" 
                v-model="login"
                 class="equipment-field">
            </label>
            <label for="password">
                <input v-if="isNewUser" id="password" 
                type="text" 
                placeholder="Введите пароль" 
                v-model="password"
                 class="equipment-field">
            </label>
            <label for="last_name">
                <input id="last_name" 
                type="text" 
                placeholder="Введите фамилию пользователя" 
                v-model="lastName"
                 class="equipment-field">
            </label>
            <label for="first_name">
                <input id="first_name"
                type="text" 
                placeholder="Введите имя пользователя" 
                v-model="firstName"
                 class="equipment-field">
            </label>
            <label for="middle_name">
                <input id="middle_name" 
                type="text" 
                placeholder="Введите отчество пользователя" 
                v-model="middleName"
                 class="equipment-field">
            </label>

            <select v-model="selectedDivision" id="division" class="equipment-field">
                <option :value="null" disabled selected>{{ baseData.divisionName }}</option>
                <option v-for="(item, index) in divisionList" :value="item" :key="index" >{{ item.division_name }}</option>
            </select>
            <select v-model="selectedRole" id="role" class="equipment-field">
                <option :value="null" disabled selected>{{ baseData.roleName }}</option>
                <option v-for="(item, index) in roleList" :value="item" :key="index" >{{ item.role_name }}</option>
            </select>

            <div class="button-block">
                <button @click="registration" v-if="isNewUser">Добавить</button>
                <button @click="updateUser" v-if="!isNewUser">Изменить</button>
                <button @click="closeModal">Закрыть</button> 
            </div>
        </div>
    </div>
</template>
 
<script>
/* eslint-disable */
import { ref, onMounted } from 'vue';
import EquipmentService from '@/api/EquipmentService';

    export default {
        name: "UserModalPage",
        props: {
            showModal: {
                type: Boolean,
                default: false,
            },
            isNewUser: {
                type: Boolean,
                default: false,
            },
            oldData: {
                type: Object,
                default: null,
            },
        },
        setup(props, { emit }) {
            /* данные для заполнения первой строки */
            const baseData = {
                divisionName: 'Выберете структурное подразделение',
                roleName: 'Выберете роль пользователя',
            }

            /* переменные для получения информации из формы */
            const login = ref('');
            const password = ref();
            const firstName = ref('');
            const lastName = ref('');
            const middleName = ref('');
            const selectedDivision = ref(null);
            const selectedRole = ref(null);

            /* Массивы данных, полученных из базы */
            const divisionList = ref([]);
            const roleList = ref([]);

            const closeModal = () => {
                login.value = '';
                password.value = '';
                firstName.value = '';
                lastName.value = '';
                middleName.value = '';
                selectedDivision.value = null;
                selectedRole.value = null;
                emit('closeModal', false);
            }
            
            const registration = async () => {
                const data = {
                    role_id: selectedRole.value,
                    division_id: selectedDivision.value,
                    login: login.value,
                    password: password.value,
                    firstName: firstName.value,
                    lastName: lastName.value,
                    middleName: middleName.value,
            };
            try {
                // console.log(data)
                await EquipmentService.registration(
                data.role_id.role_id,
                data.division_id.division_id,
                data.login,
                data.password,
                data.firstName, 
                data.lastName,
                data.middleName 
                );
            }
            catch(e) {
                    console.log(e);
            }
            finally {
                closeModal();
                window.location.reload();
            }
        }
            const updateUser = async () => {
                const data = {
                    role_id: selectedRole.value,
                    division_id: selectedDivision.value,
                    firstName: firstName.value,
                    lastName: lastName.value,
                    middleName: middleName.value,
            };

                try {
                    await EquipmentService.updateUser(
                        props.oldData.user_id, 
                        data.role_id.role_id,
                        data.division_id.division_id, 
                        props.oldData.login,
                        data.firstName, 
                        data.lastName, 
                        data.middleName)
                }
                catch(e) {
                    console.log(e);
                }
                finally {
                    closeModal();
                    window.location.reload();
                }
            }

            onMounted(async ()=> {
                await EquipmentService.getDivisionList().then(res => {
                    res.forEach(elem => {
                        divisionList.value.push(elem)
                    });
                })

                await EquipmentService.getRoleList().then(res => {
                    res.forEach(elem => {
                        roleList.value.push(elem)
                    });
                })

                if(props.oldData) {
                    firstName.value = props.oldData.first_name;
                    lastName.value = props.oldData.last_name;
                    middleName.value = props.oldData.middle_name;
                    
                    selectedDivision.value = { 
                        division_id: props.oldData.division_id,
                        division_name: props.oldData.division_name,
                    };
                    selectedRole.value = { 
                        role_id: props.oldData.role_id,
                        role_name: props.oldData.role_name,
                    };
                }
            }) 
        
            return {
                firstName,
                lastName,
                middleName,
                selectedDivision,
                selectedRole,
                baseData, 
                selectedRole,
                login,
                password,
                closeModal, 
                registration, 
                updateUser,
                divisionList,
                roleList
            }
        }
    }
</script>
 
<style scoped>
 /* Стили для модального окна */ 
    .modal { 
        position: fixed; 
        top: 0; 
        left: 0; 
        width: 100%; 
        height: 100%; 
        background-color: rgba(0, 0, 0, 0.5); 
        display: flex; 
        justify-content: center; 
        align-items: center; 
        z-index: 2;
        } 

    .modal-content { 
        display: flex;
        flex-direction: column;
        background-color: #fff; 
        padding: 20px; 
        border-radius: 5px; 
    } 

    h2 {
        font-size: 20px;
        color: #1c274c;
        font-weight: bold;
        margin: auto;
        padding-bottom: 20px;
    }
    input {
        width: 400px;
    }
    select {
        width: 408px;
    }
    .equipment-field {
        height: 40px;
        font-size: 16px;
        margin-bottom: 10px;
        border: 1px solid black;
        border-radius: 5px;
        outline: none;
        
    }

    .button-block {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
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