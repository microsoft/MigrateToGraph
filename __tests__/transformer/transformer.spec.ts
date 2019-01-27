import { Transformer } from '../../src/transformer/transformer';
import * as graphSchema from '../../src/schema/graph-schema.json';

const template = `{
    "vertices":[
      {
        "id": "{{myId}}",
        "label": "vertexLabel",
        "properties":{
          "name": "{{myName}}"
        }
      },
      {
        "id": "{{myFriendId}}",
        "label": "vertexLabel",
        "properties":{
          "name": "{{myFriendName}}"
        }
      }
    ],
    "edges":[
      {
        "label": "friend",
        "from": "{{myId}}",
        "to": "{{myFriendId}}",
        "properties": {
          "value" : {{friendshipLvl}}
        }
      }
    ]
  }`;

describe('Given transformer is initialised', () => {
  let transformer: Transformer;
  beforeAll(() => {
    transformer = new Transformer({});
  });

  it('when parseTemplate is called it should return the parsed data', () => {
    const result = transformer.parseTemplate(`{{hello}}`, { hello: 'world' });
    expect(result).toEqual('world');
  });

  it('when parseTemplate is called it with guid helper it should return the parsed data', () => {
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const result = transformer.parseTemplate(`{{$guid}}`, {});
    expect(result).toMatch(guidRegex);
  });

  it('when transformJSON is called it should transform JSON', () => {
    const data = [
      {
        myId: '1',
        myName: 'abc',
        myFriendId: '2',
        myFriendName: 'xyz',
        friendshipLvl: 3,
      },
    ];

    const expectedResult = {
      vertices: [
        {
          id: '1',
          label: 'vertexLabel',
          properties: {
            name: 'abc',
          },
        },
        {
          id: '2',
          label: 'vertexLabel',
          properties: {
            name: 'xyz',
          },
        },
      ],
      edges: [
        {
          from: '1',
          label: 'friend',
          to: '2',
          properties: {
            value: 3,
          },
        },
      ],
    };

    const result = transformer.transformJSON(template, data, graphSchema);

    expect(result).toEqual(expectedResult);
  });

  it('when validateJSON is called and json does not match the schema, it should throw error', () => {
    const json = { vertices: [{ test: 'data' }] };
    expect(() => transformer.validateJSON(json, graphSchema)).toThrow();
  });
});
