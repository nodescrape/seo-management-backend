import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { plainToClass } from 'class-transformer'

interface ClassType<T> {
  new (): T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<Partial<T>, T> {
  constructor(private readonly classType: ClassType<T>) {}

  intercept(_, next: CallHandler<Partial<T>>): Observable<T> | Promise<Observable<T>> {
    return next.handle().pipe(map(data => plainToClass(this.classType, data)))
  }
}
