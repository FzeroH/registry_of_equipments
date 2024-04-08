import instance from './config/axios.config';

class EquipmentService {
    static getEquipmentList = () => new Promise((resolve, reject) => {
        instance.get('/api/equipmnets')
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })

}


export default EquipmentService