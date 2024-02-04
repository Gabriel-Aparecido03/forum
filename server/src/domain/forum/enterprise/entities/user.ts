import { Entity } from "../../../core/entity"
import { Optional } from "../../../core/types/optional"
import { UniqueEntityID } from "@/domain/core/unique-entity-id"

export interface UserPropsType {
  username : string
  email : string
  password : string
  createdAt : Date
  updatedAt : Date | null
}

export class User extends Entity<UserPropsType> {

  get username() {
    return this.props.username
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }


  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() : Date | null {
    return this.props.updatedAt 
  }


  set updatedAt(updatedAt : Date) {
    this.props.updatedAt = updatedAt
    this.touch()
  }

  set username(username : string) {
    this.props.username = username
  }

  touch() {
    this.props.updatedAt = new Date()
  }

  static create(props : Optional<UserPropsType,'createdAt' | 'updatedAt'>, id ?: UniqueEntityID ) {
    const user = new User({
      ...props,
      createdAt : props.createdAt ?? new Date(),
      updatedAt : props.updatedAt ?? null
    },id)

    return user
  }
}