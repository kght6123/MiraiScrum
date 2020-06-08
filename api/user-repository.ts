class User {		
	private _userId: string = ''
	private _userName: string = ''
	private _created: Date = new Date()
	constructor(userId: string, userName: string, created?: Date) {
		this._userId = userId
		this._userName = userName
		if (created != null)
			this._created = created
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
interface IUserCreatePresenter {
	Complete(outputData: UserCreateOutputData): void;
}
class UserCreateViewModel {
	private _userId: string = '';
	private _createdDate: string = '';
	constructor(userId: string, createdDate: string) {
		this._userId = userId;
		this._createdDate = createdDate;
	}
  get userId(): string {
		return this._userId
	}
	set userId(userId: string) {
		this._userId = userId
	}
	get createdDate(): string {
		return this._createdDate
	}
	set createdDate(createdDate: string) {
		this._createdDate = createdDate
	}
}
class UserCreatePresenter implements IUserCreatePresenter {
	Complete(outputData: UserCreateOutputData): UserCreateViewModel {
		const viewModel: UserCreateViewModel = new UserCreateViewModel(outputData.userId, outputData.created.toISOString())
		return viewModel
	}
}
class SystemUserCreatePresenter implements IUserCreatePresenter {
	Complete(outputData: UserCreateOutputData): UserCreateViewModel {
		const viewModel: UserCreateViewModel = new UserCreateViewModel(outputData.userId, outputData.created.toUTCString())
		return viewModel
	}
}
class UserCreateInteractor implements IUserCreateUseCase {
	private _userRepository: IUserRepository
	private _presenter: IUserCreatePresenter
	constructor(userRepository: IUserRepository, presenter: IUserCreatePresenter) {
		this._userRepository = userRepository
    this._presenter = presenter
	}
	Handle(inputData: UserCreateInputData): void {
    const duplicateUser: User = this._userRepository.FindByUserName(inputData.userName)
    if (duplicateUser != null) {
      throw new Error("duplicated")
    }
    const user: User = new User('', inputData.userName)
    this._userRepository.Save(user)
    const outputData: UserCreateOutputData = new UserCreateOutputData(user.userId, new Date())
    this._presenter.Complete(outputData)
	}
}
class UserController {
  private userCreateUseCase: IUserCreateUseCase

  constructor(userCreateUseCase: IUserCreateUseCase) {
    this.userCreateUseCase = userCreateUseCase;
  }
  public CreateUser(userName: string): void {
    var inputData = new UserCreateInputData(userName)
    this.userCreateUseCase.Handle(inputData)
  }
}