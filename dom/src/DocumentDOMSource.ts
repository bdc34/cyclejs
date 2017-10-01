import xs, {Stream, MemoryStream} from 'xstream';
import {adapt} from '@cycle/run/lib/adapt';
import {DevToolEnabledSource} from '@cycle/run';
import {BaseDOMSource, EventsFnOptions} from './DOMSource';
import {fromEvent} from './fromEvent';

export class DocumentDOMSource implements BaseDOMSource {
  constructor(private _name: string) {}

  public select(selector: string): DocumentDOMSource {
    // This functionality is still undefined/undecided.
    return this;
  }

  public elements(): MemoryStream<Document> {
    const out: DevToolEnabledSource & MemoryStream<Document> = adapt(
      xs.of(document),
    );
    out._isCycleSource = this._name;
    return out;
  }

  public events(
    eventType: string,
    options: EventsFnOptions = {},
  ): Stream<Event> {
    let stream: Stream<Event>;

    stream = fromEvent(
      document,
      eventType,
      options.useCapture,
      options.preventDefault,
    );

    const out: DevToolEnabledSource & Stream<Event> = adapt(stream);
    out._isCycleSource = this._name;
    return out;
  }
}
