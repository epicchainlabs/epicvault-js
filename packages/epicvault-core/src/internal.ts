/**
 * Parses a string, number or enum to an enum.
 */
export function parseEnum<T extends object>(
  input: string | number | T[keyof T],
  enumType: T
): T[keyof T] {
  if (typeof input === "string") {
    if (input in enumType) {
      return enumType[input as keyof typeof enumType];
    }
    throw new Error(`${input} not found in enum!`);
  }
  return input as T[keyof T];
}

/**
 * Simple type helper to merge types that have the same field names.
 */
export type EpicVaultLike<EpicVaultType, JsonType> = {
  [Property in keyof EpicVaultType & keyof JsonType]:
    | EpicVaultType[Property]
    | JsonType[Property];
};
