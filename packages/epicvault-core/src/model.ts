/**
 * The EpicVaultObject is the base interface for working with objects within neon-js. This is a rule of thumb on how the code operates.
 * @param T - The plain JSON equivalent of the EpicVaultObject. All interfaces in this class should be postfixed with 'Like'. For example, TransactionLike.
 */
export interface EpicVaultObject<T> {
  /**
   * Exports the current object to the plain JSON object equivalent.
   */
  export(): T;

  /**
   * Compares if the current object and the other object is equivalent in meaning. This meaning is dependent on individual implementations but generally it refers to data equivalency.
   */
  equals(other: Partial<T>): boolean;
}
