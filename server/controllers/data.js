import Job from '../models/data.js';

export const getData = async (req, res) => {
    const key = req.params.key;
    const value = req.params.value;
    console.log(key, value);
    value.toLowerCase();
    const temp = await Job.find()
    try{
        if(key == 'title'){
            let unique = [];
            temp.forEach(i => {
                let check = i.title.toLowerCase()
                if(check.includes(value)) { 
                    unique.push(i) ;
                }
            })
            res.status(201).json({message: unique});
        }
        else if(key == 'location'){
            let unique = [];
            temp.forEach(i => {
                let check = i.location.toLowerCase()
                if(check.includes(value)) { 
                    unique.push(i) ;
                }
            })
            res.status(201).json({message: unique});
        }
        else if(key == 'date'){
            let unique = [];
            temp.forEach(i => {
                let curr_date = new Date(i.date).toLocaleDateString(undefined, {timeZone: 'Asia/Kolkata'});
                if(curr_date.includes(value)) { 
                    unique.push(i) ;
                }
            })
            res.status(201).json({message: unique});
        }
        else{
            res.status(201).json({message: 'Not found'});
        }
    }
    catch(error){
        res.status(409).json({message: error.message})
    }
}

export const getAllData = async (req, res) => {
    try{
        const data = await Job.find();
        res.status(201).json({message: data})
    }
    catch(error){
        res.status(409).json({message: error.message})
    }
}

export const getTwoData = async (req, res) => {
    const key1 = req.params.key1;
    const value1 = req.params.value1;
    const key2 = req.params.key2;
    const value2 = req.params.value2;
    console.log(key1, value1, key2, value2);
    const temp = await Job.find()
    value1.toLowerCase();
    value2.toLowerCase();
    try{
        if(key1 == 'title'){
            if(key2 == 'location'){
                let unique = [];
                temp.forEach(i => {
                    let check1 = i.title.toLowerCase()
                    let check2 = i.location.toLowerCase()
                    if(check1.includes(value1) && check2.includes(value2)) { 
                        unique.push(i) ;
                    }
                })
                res.status(201).json({message: unique});
            }
            else{
                let unique = [];
                temp.forEach(i => {
                    let check1 = i.title.toLowerCase()
                    let curr_date = new Date(i.date).toLocaleDateString(undefined, {timeZone: 'Asia/Kolkata'});
                    if(check1.includes(value1) && curr_date.includes(value2)) { 
                        unique.push(i) ;
                    }
                })
                res.status(201).json({message: unique});
            }
        }
        else{
            let unique = [];
            console.log(key1, value1, key2, value2);
            temp.forEach(i => {
                let check2 = i.location.toLowerCase()
                let curr_date = new Date(i.date).toLocaleDateString(undefined, {timeZone: 'Asia/Kolkata'});
                if(check2.includes(value1) && curr_date.includes(value2)) { 
                    unique.push(i) ;
                }
            })
            res.status(201).json({message: unique});
        }
    }
    catch(error){
        res.status(409).json({message: error.message})
    }
}

export const getThreeData = async (req, res) => {
    const key1 = req.params.key1;
    const value1 = req.params.value1;
    const key2 = req.params.key2;
    const value2 = req.params.value2;
    const key3 = req.params.key3;
    const value3 = req.params.value3;
    console.log(key1, value1, key2, value2, key3, value3);
    const temp = await Job.find()
    value1.toLowerCase();
    value2.toLowerCase();
    try{
        let unique = [];
        temp.forEach(i => {
            let check1 = i.title.toLowerCase()
            let check2 = i.location.toLowerCase()
            let curr_date = new Date(i.date).toLocaleDateString(undefined, {timeZone: 'Asia/Kolkata'});
            if(check1.includes(value1) && check2.includes(value2) && curr_date.includes(value3)) { 
                unique.push(i) ;
            }
        })
        res.status(201).json({message: unique});
    }
    catch(error){
        res.status(409).json({message: error.message})
    }
}