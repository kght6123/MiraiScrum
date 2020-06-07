class User {		
	private _userId: string = '';
	private _userName: string = '';
	private _created: Date = new Date();
	constructor(userId: string, userName: string, created: Date) {
		this._userId = userId;
		this._userName = userName;
		this._created = created;
	}
	get userId(): string {
		return this._userId
	}
	set userId(userId: string) {
		this._userId = userId
	}
	get userName(): string {
		return this._userName
	}
	set userName(userName: string) {
		this._userName = userName
	}
	get created(): Date {
		return this._created
	}
	set created(created: Date) {
		this._created = created
	}
}
interface IUserCreateUseCase {
  Handle(inputData: UserCreateInputData): void;
}
class UserCreateInputData {
	private _userName: string = '';
	constructor(userName: string) {
		this._userName = userName;
	}
	get userName(): string {
		return this._userName
	}
	set userName(userName: string) {
		this._userName = userName
	}
}
class UserCreateOutputData {
	private _userId: string = '';
	private _created: Date = new Date();
	constructor(userId: string, created: Date) {
		this._userId = userId;
		this._created = created;
	}
  get userId(): string {
		return this._userId
	}
	set userId(userId: string) {
		this._userId = userId
	}
	get created(): Date {
		return this._created
	}
	set created(created: Date) {
		this._created = created
	}
}
interface IUserRepository {
	FindByUserName(userName: String): User;
	Save(user: User): void;
}
class UserRepository implements IUserRepository {
	FindByUserName(userName: String): User {
		throw new Error("Method not implemented.");
		// ここにSQLなど実行する処理を描く
	}
	Save(user: User): void {
		throw new Error("Method not implemented.");
		// ここにSQLなど実行する処理を描く
	}
}