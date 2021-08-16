import axios from "axios";

const loginAxios = async (email, password) => {
    const res = await axios.post('https://app-dicti.herokuapp.com/auth/login', {
        email, password
    });
    return res;
};

const registrationAxios = async (nickname, email, password, repeatPass) => {
    const res = await axios.post('http://localhost:5000/auth/registration', {
        nickname, email, password, repeatPass
    });
    return res;
};

export { loginAxios, registrationAxios };