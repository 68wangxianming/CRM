import {Student, Teacher, Classroom} from '../interface/index'
import {inject, injectable} from 'inversify'
import TYPES from '../types/index'
import 'reflect-metadata'

@injectable()
class Xiaoming implements Student {
    public learn() {
        return "好好学习"
    }
}

@injectable()
class Zhijia implements Teacher {
    public teaching() {
        return "教前端"
    }
}

@injectable()
class Yd implements Classroom {
    private _xiaoming: Student;
    private _zhijia: Teacher;

    constructor(@inject(TYPES.Student) Xiaoming: Student, @inject(TYPES.Teacher) Zhijia: Teacher) {
        this._xiaoming = Xiaoming;
        this._zhijia = Zhijia;
    }

    public study() {
        return this._zhijia.teaching() + this._xiaoming.learn()
    }
}

export {
    Xiaoming,
    Zhijia,
    Yd
}
