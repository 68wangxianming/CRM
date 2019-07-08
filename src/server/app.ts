import container from './config/index';
import TYPES from './types/index';
import {Classroom} from './interface/index';

const classroom = container.get<Classroom>(TYPES.Classroom);
console.log(classroom.study());
