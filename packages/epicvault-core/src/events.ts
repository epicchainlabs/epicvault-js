/**
 * Event handling functionality for EpicVault
 */

import { EventEmitter, EventFilter, EventLog, EventHandler, Address } from './types';
import { logger } from './logging';
import { EpicVaultError } from './types';

export class EventManager implements EventEmitter {
  private listeners: Map<string, Set<EventHandler>> = new Map();
  private filters: Map<string, EventFilter> = new Map();

  constructor() {}

  /**
   * Add an event listener
   */
  public on(event: string, listener: EventHandler): this {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener);
    return this;
  }

  /**
   * Add a one-time event listener
   */
  public once(event: string, listener: EventHandler): this {
    const onceListener = (log: EventLog) => {
      listener(log);
      this.off(event, onceListener);
    };
    return this.on(event, onceListener);
  }

  /**
   * Remove an event listener
   */
  public off(event: string, listener: EventHandler): this {
    const listeners = this.listeners.get(event);
    if (listeners) {
      listeners.delete(listener);
      if (listeners.size === 0) {
        this.listeners.delete(event);
      }
    }
    return this;
  }

  /**
   * Remove all event listeners
   */
  public removeAllListeners(event?: string): this {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
    return this;
  }

  /**
   * Emit an event
   */
  public emit(event: string, log: EventLog): boolean {
    const listeners = this.listeners.get(event);
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener(log);
        } catch (error) {
          logger.error(`Error in event listener for ${event}`, error);
        }
      });
      return true;
    }
    return false;
  }

  /**
   * Add an event filter
   */
  public addFilter(id: string, filter: EventFilter): void {
    this.filters.set(id, filter);
  }

  /**
   * Remove an event filter
   */
  public removeFilter(id: string): void {
    this.filters.delete(id);
  }

  /**
   * Check if a log matches any filter
   */
  public matchesFilter(log: EventLog): boolean {
    for (const filter of this.filters.values()) {
      if (this.matchesSingleFilter(log, filter)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Check if a log matches a specific filter
   */
  private matchesSingleFilter(log: EventLog, filter: EventFilter): boolean {
    if (filter.address && filter.address.toLowerCase() !== log.address.toLowerCase()) {
      return false;
    }

    if (filter.topics) {
      for (let i = 0; i < filter.topics.length; i++) {
        const topic = filter.topics[i];
        if (!topic) continue;

        if (Array.isArray(topic)) {
          if (!topic.includes(log.topics[i])) {
            return false;
          }
        } else if (topic !== log.topics[i]) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Process a new event log
   */
  public processLog(log: EventLog): void {
    if (this.matchesFilter(log)) {
      this.emit('log', log);
    }
  }

  /**
   * Get all active filters
   */
  public getFilters(): Map<string, EventFilter> {
    return this.filters;
  }

  /**
   * Get all active listeners
   */
  public getListeners(): Map<string, Set<EventHandler>> {
    return this.listeners;
  }
} 