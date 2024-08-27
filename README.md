# PreqinTask

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/js?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Getting started

`yarn install`

## Run tasks

Start webapp `yarn nx run webapp:serve`
Start api `yarn nx run api:serve`

## How to use

Open web app http://localhost:4200/

http://localhost:4200/ - investor list page, you can click on list row to be navigated to details page

http://localhost:4200/investor/:id - investor details page with list of commitment

## What can be improved

Testing

1. Integration testing
2. Unit testing for money calculations
3. Component testing for FE
4. E2E tests of the main flow

UI/UX

1.More pretty deign
1.Semantic tags, accessability (but still ok , since we use Material Design system )

UI Performance - DID NOT add it to avoid PREMATURE OPTIMIZATION

1. Prefetching of investor details
2. Virtual list for table

API Performance - DID NOT add it to avoid PREMATURE OPTIMIZATION

1. Add pagination to all endpoints
2. Add o11y
3. ?? Unknown - I do not know potential load
