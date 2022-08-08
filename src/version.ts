import { join } from 'path';
import { readFileSync } from 'fs';

export function version() {
  const pkgJsonContent = readFileSync(join(__dirname, '..', 'package.json')).toString();
  const pkgInfo = JSON.parse(pkgJsonContent);
  return pkgInfo.version;
}
