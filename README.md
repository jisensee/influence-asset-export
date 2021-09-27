# influence-asset-export

Export [Influence](https://influenceth.io) asteroids through a command line interface 🚀

Uses [adalia.info](https://adalia.info) to generate the asteroid exports.
Visit the site to check when the data was last refreshed.

## Usage

Install the npm package (install Node.js if needed)
```
npm install -g influence-asset-export
```

Check the available integrated help:
```
influence-asset-export -h
```

### Examples

**Export all asteroids as CSV**  
```
influence-asset-export --mode all --format csv -a rocks.csv
```

**Export asteroids owned by a list of addresses as JSON**  
```
cat addresses.txt | influence-asset-export --mode owners --format json --asteroid-export-file rocks.json
```
The addresses are provided through STDIN with each address on its own line. The export will then contain all asteroids that are owned by any of the given addresses.
