import Account from "./Account";
import { decryptEpicChain } from "./xep2";
import { DEFAULT_SCRYPT } from "../consts";

/**
 * Upgrades a epicchain account to a epicchain account. If an encrypted account is provided, the returned account is also encrypted with the same passphrase.
 */
export async function upgrade(
  account: Account,
  passphrase = "",
  scryptParams = DEFAULT_SCRYPT
): Promise<Account> {
  // Checks that account is upgradable
  if (!account.tryGet("privateKey") && passphrase === "") {
    throw new Error(`The account needs an unencrypted private key.`);
  }
  // Check if address is epicchain style (Starts with A)
  if (!account.address.startsWith("A")) {
    throw new Error(`This is not a epicchain Address.`);
  }

  if (passphrase) {
    const wifKey = await decryptEpicChain(
      account.encrypted,
      passphrase,
      scryptParams
    );
    const epicchainAccount = new Account(wifKey);
    return await epicchainAccount.encrypt(passphrase, scryptParams);
  }

  const wifKey = account.WIF;
  const epicchainAccount = new Account(wifKey);
  return epicchainAccount;
}
