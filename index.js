
const users = [{
    id: 1,
    name: 'Andrew',
    schoolId: 101
},
{
    id: 2,
    name: 'Jessica',
    schoolId: 999
}];

const grades = [{
    id: 1,
    schoolId: 101,
    grade: 86
},
{
    id: 2,
    schoolId: 999,
    grade: 100
},
{
    id: 3,
    schoolId: 101,
    grade: 80
}];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === id);
        if(user){
            resolve(user);
        }else{
            reject(`cant find user with id:${id}`);
        }
    });
};

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolId === schoolId));
    });
};

const getStatus = userId => { 
    return getUser(userId)
        .then(user =>  getGrades(user.schoolId))
            .then(grades => {
                return grades
            })
}

const getStatusAlt = async (userId) => {
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolId);
    const reit = grades.map(grade => grade.grade).reduce((a, b) => a + b) / grades.length
    return `${user.name} has rait ${reit}%`
 
};


getStatusAlt(1)
    .then(console.log)
    .catch(console.log)

// getGrades(101)
//     .then(grades => console.log('grades', grades))
//     .catch(err => console.log(err));

// getUser(1)
//     .then((user) => {
//         console.log('user', user);
//     }).catch((err) => {
//         console.log(err);
// });

// getStatus(1)
//     .then(status => {
//         console.log('status', status);
//     }).catch((err) => {
//         console.log(err);
// });
