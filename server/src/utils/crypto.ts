import sha256 from "crypto-js/sha256";

export class Crypto {
	encrypt(password: string): string {
		return sha256(password).toString();
	}
}
