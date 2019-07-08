import {Container} from 'inversify'
import TYPES from '../types/index'
import {Student, Teacher, Classroom} from '../interface/index'
import {Xiaoming, Zhijia, Yd} from '../entities/index'

const container = new Container();
container.bind<Student>(TYPES.Student).to(Xiaoming);
container.bind<Teacher>(TYPES.Teacher).to(Zhijia);
container.bind<Classroom>(TYPES.Classroom).to(Yd);

export default container;
