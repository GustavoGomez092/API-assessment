import { mongoose } from "@typegoose/typegoose";
import { Service } from "typedi";
import config from "../config";

@Service()
export default class MongoLoader {
	
	user: string
	password: string
	uri: string

	constructor () {
		this.user = config.MONGO_USER
		this.password = config.MONGO_PASS
		this.uri = config.MONGO_CONNECTION_STRING 

		if (!this.user) throw new Error('Mongo user is required. Check your .ENV file')
		if (!this.password) throw new Error('Mongo pass is required. Check your .ENV file')
		if (!this.uri) throw new Error('Connection URI is required. . Check your .ENV file')
	}

	async init(): Promise<void> {
		try {
			console.log('Initializing Mongo')
			await mongoose.connect(`mongodb+srv://${this.user}:${this.password}${this.uri}`, {
				useNewUrlParser: true,
      	useUnifiedTopology: true,
      	useCreateIndex: true,
      	useFindAndModify: false
			})
			console.log('Mongo Initialized')
		} catch (error) {
			throw new Error(error)
		}
	}

}