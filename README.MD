# AnimeListExporter
With this tool you can export your lists (anime, manga) from Anilist to the XML-file-format from MAL. The generated files can be imported in MAL or Anilist.

## Notes
Actually (february 2020) you can only import anime-lists in MAL.

## Requirements
- NodeJS >= 12

## Installation
```bash
  # install dependencies
  $ npm i
```
## Testing
```bash
  # run all integration tests
  $ npm run test
```

## Usage
```bash
  # run the tool
  $ node index -u Username -l Lists
```
- -u Username: Replace Username with the name of the user you want to generate lists
- -l Lists: Replace Lists with the lists you want to generate. As example you can specify lists like this:
  - Anime
  - Manga
  - Anime,Manga
- -h: calls for help