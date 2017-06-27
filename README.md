111
Je možné spustit aplikaci přes <strong>npm watch</strong>(udělá build a sleduje změny pro rebuild) + <strong>npm start</strong>(spustí aplikační server).
Při změně server scriptů je třeba restartovat(AS) „npm start“.

<strong>Pro šablony:</strong>
Pro vytvoření šablony vytvořte adresař pro komponentu(může to být i celá stránka) do <strong>src/app</strong> a do něj soubor <strong>name.template.html</strong> pro obsah šablony.
Styly pro komponenty budou ve stejném adresáři v souboru <strong>name.style.css</strong>
Obecné styly v adresáři <strong>src/assets/css</strong>
Obrázky v adresáři <strong>src/assets/img</strong>

<strong>Pro backend funkce:</strong>
Pro vytváření backend funkcí pro REST API bude adresář src/backend
Každý modul bude mít svůj soubor.
Jazyk pro psaní kódu bude ECMAscript5.
Routování na serveru je v souboru <strong>src/backend/routes</strong>

<strong>Pro projekt:</strong>
Npm i
Nastavit ve Webstormu:
-	Languages & frameworks / Node.js and NPM / Enable
-	Languages & frameworks / Typescript / Disable “use Typescript Service”, Enable “Enable Typescript compiler”, Enable “Use tsconfig.json” 
