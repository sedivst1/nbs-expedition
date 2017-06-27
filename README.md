V projektu AMED na git(ssh://developer@192.168.255.193:22/srv/git/customers/ucl/amed.git) jsem vytvořil kostru pro vývoj aplikace.

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

<h3>Label v komponentách</h3>
pro dotažení labelu do komponenty je třeba:<br />
do komponentu formu vložit proměnnou s názvem formu, jako je v DB formulářích TABULKA i s verzí.<br />
<strong><i>public FORM_NAME: string = 'CAA_F_154_1_V1';</i></strong><br />
Tato proměnná se nabinduje do každé komponenty s labelem ve formu.<br />
<strong><i>[parentForm]="FORM_NAME"</i></strong><br />
Každá komponenta s labelem musí mít vstupní parametr.<br />
<strong><i>@Input('parentForm') public parentForm: string;</i></strong><br />
Na lebel v komponentě se navěsí:<br />
<strong><i>label-mf [parentForm]="parentForm"</i></strong><br />

<h3>Aplikační číselníky</h3>
Data pro komboboxy, checkboxy a jine jsou v konstantach(constants_options).<br />
Pro každou komponentu, která má aplikační data, je třeba založit v tomto souboru proměnnou s jejím názvem a vložit pole hodnot.<br />
Objekty v poli musí obsahovat vlastnost ID.<br />
U obecnych komponent s využitím MFTF komonenty se nesmí zapomenout přidat také záznam v konstantách.<br />