### gql-to-typescript

### usage

First you gonna need to install it: `npm install --save gql-to-typescript`

Lets say you have a bunch of files on the server, in which you use the gql tag, you want them to be turned into greatly typed typescript? it's simply a matter of calling:

```typescript
import { convertFiles } from 'gql-to-typescript';

// pass a glob path to detect the files needed, files without gql tag will simply be ignored.
convertFiles('/src/**/*.gql.ts', {
	// where the output file will be
        outputFile: '/src/types/TypescriptIsAwesome.ts',
	// the typescript namespace to be used
        namespace: 'TypescriptIsAwesome',
	// define custom scalar types that map a name of the type to a ts type.
	scalars: {
    	  TypeAny: 'any',
    	  TypeHashMap: `{ 
            [key: string]: string|number
          }`
	},
	// you can ignore some types and they will not appear in the ts file
	ignoreTypes: ['Query', 'Mutation', 'MyTypeToIgnore']
	// only _empty is ignored by default, you can pass an empty array to override this
	// _empty is mostly used to create a base type and extend it over several schema shards
	ignoreFields: ['_empty']
    })
```

Here is a sample file
```graphql
/* .... some code */
const mySchema = gql`
    type Query {
        " Live long, and prosper. 🖖 "
        getSpoke(season: String!): Spoke
    }
    type Spoke {
        name: String
        age: Int
        id: ID!
    }
`;
/* .... some other code */
```
And after going through the converter, we will get this typescript file, do notice that all functions (queries, mutations and subscriptions) will be optionals to make life easier when using them in your ts code.

```typescript
export namespace StarTrackApi {
    export interface Query {
        /*  Live long, and prosper. 🖖  */
        getSpoke?: (season: string) => Spoke;
    }
    export interface Spoke {
        name?: string
        age?: number
        id: string | number
    }
}
```

#### what problem does this library solve

Let's say you want to be able to define a strongly typed server that works with a strongly typed frontend, and you want both to work with graphql, the issue is you might find yourself using typescript-to-graphql kind of libraries that generate graphql fron annotated typescript, the issue is that you want to take the types to the frontend, but not the output of the annotations use since those libraries are pretty big for a client - instead of doing that, the idea behind this library is to make use of the gql tag, and create a single typescript file which you can share between the client and the server.

gql is the graphql-tag way of doing graphql, it defines multiple small schemas annotated with the gql tag and it makes building a graphql server very simple and intuitive.

#### What more to come
I need to create a wabpack plugin, and a cli tool.
