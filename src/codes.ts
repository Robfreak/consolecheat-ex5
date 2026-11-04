export const PLATFORMS = ["PS4", "PS5"] as const;
export const CATEGORIES = [
  "network",
  "system",
  "account",
  "storage",
  "application",
  "disc",
  "payment",
  "update",
] as const;
export const PREFIXES = ["CE", "NW", "SU", "WS", "NP"] as const;

export type Platform = (typeof PLATFORMS)[number];
export type Category = (typeof CATEGORIES)[number];
export type Prefix = (typeof PREFIXES)[number];

export type Localized = {
  summary: string;
  steps: string;
};

export type ErrorCode = {
  code: string;
  platform: Platform;
  category: Category;
  source: string;
  de: Localized;
  en: Localized;
};

/** Official Sony error-code search. Used when a code is not in this list. */
export const sonyErrorSearch = {
  de: "https://www.playstation.com/de-de/support/error-codes/",
  en: "https://www.playstation.com/en-us/support/error-codes/",
} as const;

function entry(platform: Platform, code: string, category: Category, de: Localized, en: Localized): ErrorCode {
  const slug = platform === "PS4" ? "ps4" : "ps5";
  return {
    code,
    platform,
    category,
    source: `https://www.playstation.com/en-us/support/error-codes/${slug}/${code.toLowerCase()}/`,
    de,
    en,
  };
}

/**
 * Curated PS4 and PS5 codes. Each source URL was checked on playstation.com
 * (individual support page, HTTP 200, 2026-10-22). Wording is paraphrased.
 * No PS5 code with the E- prefix appeared on the official PS5 list, so E- is omitted.
 */
export const codes: readonly ErrorCode[] = [
  entry(
    "PS4",
    "CE-34878-0",
    "application",
    {
      summary: "Ein Spiel oder eine App auf der PS4 ist mit einem Fehler abgebrochen.",
      steps:
        "Systemsoftware und das Spiel aktualisieren, dann die Konsole neu starten. Hängt eine Kamera dran, abziehen. Kommt der Code wieder, Spielstände sichern und die PS4 initialisieren. Das leert den Speicher.",
    },
    {
      summary: "A game or app on the PS4 closed because of an error.",
      steps:
        "Update the system software and the game, then restart. Unplug a camera if one is attached. If the code returns, back up saves and initialize the PS4. That erases storage.",
    },
  ),
  entry(
    "PS4",
    "CE-41839-5",
    "application",
    {
      summary: "Ein Spiel oder eine App auf der PS4 hat einen Fehler gemeldet.",
      steps:
        "Spiel und Systemsoftware auf den neuesten Stand bringen und neu starten. Bleibt es bei einem Titel, diesen neu installieren. Weitere Schritte stehen auf der Sony-Seite.",
    },
    {
      summary: "A game or app on the PS4 reported an error.",
      steps:
        "Bring the game and the system software up to date, then restart. If one title keeps failing, reinstall that title. Further steps are on the Sony page.",
    },
  ),
  entry(
    "PS4",
    "CE-36329-3",
    "system",
    {
      summary: "Die Systemsoftware der PS4 hat einen Fehler gemeldet.",
      steps:
        "Zuerst ein Update über die Einstellungen versuchen. Geht das Menü nicht auf, das Update im abgesicherten Modus anstoßen. Hält der Fehler an, Daten sichern und die Konsole initialisieren.",
    },
    {
      summary: "The PS4 system software reported an error.",
      steps:
        "Try an update from Settings first. If the menu will not open, start the update from Safe Mode. If the error stays, back up and initialize the console.",
    },
  ),
  entry(
    "PS4",
    "CE-34335-8",
    "storage",
    {
      summary: "Die PS4 findet keine Festplatte.",
      steps:
        "Konsole aus, Stromkabel ziehen, Abdeckung abnehmen und prüfen, ob die Platte fest sitzt. Bleibt der Code, kann das Laufwerk defekt sein. Dann ist eine Reparatur der nächste Schritt.",
    },
    {
      summary: "The PS4 does not see a hard drive.",
      steps:
        "Power the console off, unplug it, take the cover off, and check that the drive is seated. If the code stays, the drive may be faulty and the console may need repair.",
    },
  ),
  entry(
    "PS4",
    "CE-30005-8",
    "storage",
    {
      summary: "Der Zugriff auf die Festplatte oder das Disc-Laufwerk ist fehlgeschlagen.",
      steps:
        "Neu starten. Liegt eine Disc ein, herausnehmen und auf Schmutz prüfen. Wiederholt sich der Code, die Konsole prüfen lassen, statt intern weiterzuraten.",
    },
    {
      summary: "Reading the hard drive or the disc drive failed.",
      steps:
        "Restart. If a disc is inserted, take it out and check it for dirt. If the code keeps coming back, have the console checked rather than guessing at the hardware.",
    },
  ),
  entry(
    "PS4",
    "CE-32869-8",
    "system",
    {
      summary: "Eine Anwendung startet nicht. Die Datenbank der PS4 wirkt beschädigt.",
      steps:
        "Die Datenbank im abgesicherten Modus neu aufbauen und die App danach erneut starten. Die genaue Auswahl steht auf der Sony-Seite.",
    },
    {
      summary: "An application will not start. The PS4 database looks damaged.",
      steps:
        "Rebuild the database from Safe Mode, then start the app again. The exact choice is on the Sony page.",
    },
  ),
  entry(
    "PS4",
    "CE-38612-0",
    "storage",
    {
      summary: "Anwendungsdaten auf der Festplatte wirken teilweise beschädigt.",
      steps:
        "Das betroffene Spiel neu installieren. Spielstände vorher sichern, solange die Konsole sie noch hergibt.",
    },
    {
      summary: "Application data on the hard drive looks partly damaged.",
      steps: "Reinstall the game that failed. Back up saves first, while the console can still read them.",
    },
  ),
  entry(
    "PS4",
    "CE-37732-2",
    "storage",
    {
      summary: "Eine heruntergeladene Datei wurde nicht sauber installiert. Der Download kann beschädigt sein.",
      steps:
        "Den Download löschen und über ein ruhiges Netz neu laden. Reicht der Speicher nicht, vorher Platz schaffen.",
    },
    {
      summary: "A downloaded file did not install cleanly. The download may be damaged.",
      steps: "Delete the download and fetch it again on a quiet network. Free space first if storage is tight.",
    },
  ),
  entry(
    "PS4",
    "CE-32937-4",
    "network",
    {
      summary: "Ein Download auf der PS4 ist fehlgeschlagen.",
      steps: "Die Verbindung prüfen und den Download neu anstoßen. Hakt das Netz, den Router kurz vom Strom nehmen.",
    },
    {
      summary: "A download on the PS4 failed.",
      steps: "Check the connection and start the download again. If the network is stuck, power-cycle the router.",
    },
  ),
  entry(
    "PS4",
    "CE-33986-9",
    "network",
    {
      summary: "Der Verbindungstest der PS4 ist mit einem Fehler beendet.",
      steps:
        "Den Test unter Einstellungen, Netzwerk wiederholen und den Router neu starten. Bei manuellen Adressen die Werte mit dem Anbieter abgleichen.",
    },
    {
      summary: "The PS4 connection test ended with an error.",
      steps:
        "Run the test again from Settings, Network, and restart the router. If addresses are entered by hand, check them with the provider.",
    },
  ),
  entry(
    "PS4",
    "CE-33987-0",
    "account",
    {
      summary: "Die Anmeldung ist abgebrochen, weil das Netz zu lange gebraucht hat.",
      steps: "Erneut anmelden und den Router neu starten. Ein überlastetes Netz bricht die Anmeldung an dieser Stelle ab.",
    },
    {
      summary: "Sign-in stopped because the network took too long.",
      steps: "Sign in again and restart the router. A crowded network is what usually cuts sign-in off here.",
    },
  ),
  entry(
    "PS4",
    "CE-35239-2",
    "update",
    {
      summary: "Für Netzfunktionen fehlt ein Systemupdate.",
      steps: "Die Systemsoftware aktualisieren und den Dienst danach erneut öffnen.",
    },
    {
      summary: "Network features need a system update first.",
      steps: "Update the system software, then open the service again.",
    },
  ),
  entry(
    "PS4",
    "CE-42747-4",
    "update",
    {
      summary: "Die Systemsoftware der PS4 ist für diese Aktion zu alt.",
      steps: "Das Update installieren und den Vorgang danach wiederholen.",
    },
    {
      summary: "The PS4 system software is too old for this action.",
      steps: "Install the update, then repeat what you were doing.",
    },
  ),
  entry(
    "PS4",
    "CE-35486-6",
    "disc",
    {
      summary: "Die PS4 liest die Disc nicht. Das Format ist unbekannt oder die Disc ist beschädigt.",
      steps:
        "Die Disc auf Fingerabdrücke und Kratzer prüfen und richtig herum einlegen. Eine andere Disc zeigt, ob das Laufwerk selbst noch liest.",
    },
    {
      summary: "The PS4 cannot read the disc. The format is unsupported, or the disc is damaged.",
      steps:
        "Check the disc for prints and scratches, and insert it the right way up. Another disc shows whether the drive itself still reads.",
    },
  ),
  entry(
    "PS4",
    "CE-33191-7",
    "disc",
    {
      summary: "Es liegt die falsche Disc ein.",
      steps: "Die Disc einlegen, die zum installierten Spiel gehört.",
    },
    {
      summary: "The disc in the drive is the wrong one.",
      steps: "Insert the disc that belongs to the installed game.",
    },
  ),
  entry(
    "PS4",
    "CE-34867-8",
    "disc",
    {
      summary: "Es liegt eine andere Disc ein, als die Konsole erwartet.",
      steps: "Die geforderte Scheibe einlegen. Bei einem Spiel mit mehreren Discs zählt die, nach der gerade gefragt wird.",
    },
    {
      summary: "A different disc is inserted from the one the console expects.",
      steps: "Insert the disc it asked for. On a multi-disc game, that is the disc for the current step.",
    },
  ),
  entry(
    "PS4",
    "CE-37857-0",
    "storage",
    {
      summary: "Die PS4 erkennt den USB-Speicher nicht.",
      steps:
        "Den Stick direkt an die Konsole stecken, nicht über einen Hub ohne eigene Stromversorgung, und neu starten. Ein anderer Stick grenzt ein, ob dieses Gerät das Problem ist.",
    },
    {
      summary: "The PS4 does not recognize the USB storage.",
      steps:
        "Plug the drive straight into the console, not through an unpowered hub, and restart. Another drive shows whether this device is the problem.",
    },
  ),
  entry(
    "PS4",
    "CE-34788-0",
    "update",
    {
      summary: "Diese Update-Datei lässt sich nicht verwenden.",
      steps: "Die Datei löschen und das Update neu laden. Eine alte oder fremde Datei vom USB nimmt die Konsole nicht an.",
    },
    {
      summary: "This update file cannot be used.",
      steps: "Delete the file and download the update again. The console rejects an old or unrelated file from USB.",
    },
  ),
  entry(
    "PS4",
    "CE-34224-5",
    "system",
    {
      summary: "Die PS4 hat einen Systemfehler gemeldet.",
      steps:
        "Neu starten. Kommt der Code sofort wieder, Spielstände sichern, soweit das noch geht, und die Schritte auf der Sony-Seite folgen.",
    },
    {
      summary: "The PS4 reported a system error.",
      steps: "Restart. If the code returns at once, back up saves while you still can, and follow the steps on the Sony page.",
    },
  ),
  entry(
    "PS4",
    "CE-34697-9",
    "storage",
    {
      summary: "Die Festplatte der PS4 kann einen Defekt haben.",
      steps:
        "Neu starten. Wiederholt sich der Code, Spielstände sichern, solange das noch geht, und die Platte prüfen lassen.",
    },
    {
      summary: "The PS4 hard drive may be failing.",
      steps: "Restart. If the code repeats, back up saves while that still works, and have the drive checked.",
    },
  ),
  entry(
    "PS4",
    "CE-37704-1",
    "storage",
    {
      summary: "Der Download wurde abgebrochen, weil auf der Festplatte zu wenig Platz ist.",
      steps: "Spiele oder Aufnahmen löschen, die nicht mehr gebraucht werden, und den Download neu starten.",
    },
    {
      summary: "The download stopped because the hard drive is too full.",
      steps: "Delete games or captures you no longer need, then start the download again.",
    },
  ),
  entry(
    "PS4",
    "CE-33950-0",
    "account",
    {
      summary: "Die Lizenz ließ sich auf dem Server nicht prüfen.",
      steps:
        "Mit dem Konto anmelden, dem der Inhalt gehört, und das Netz testen. Ohne diese Verbindung kann die PS4 die Lizenz nicht bestätigen.",
    },
    {
      summary: "The license could not be checked with the server.",
      steps:
        "Sign in with the account that owns the content, and test the network. Without that connection the PS4 cannot confirm the license.",
    },
  ),
  entry(
    "PS4",
    "CE-30774-1",
    "update",
    {
      summary: "Ein Update lässt sich nicht installieren.",
      steps: "Freien Speicher prüfen, die Update-Datei löschen und neu laden. Die Systemsoftware aktuell halten.",
    },
    {
      summary: "An update cannot be installed.",
      steps: "Check free space, delete the update file, and download it again. Keep the system software current.",
    },
  ),
  entry(
    "PS4",
    "CE-30002-5",
    "application",
    {
      summary: "Die Anwendungsdaten können beschädigt sein.",
      steps: "Das Spiel neu installieren. Spielstände vorher sichern, wenn sie noch lesbar sind.",
    },
    {
      summary: "The application data may be damaged.",
      steps: "Reinstall the game. Back up saves first if they can still be read.",
    },
  ),
  entry(
    "PS4",
    "CE-32809-2",
    "application",
    {
      summary: "Beim Start eines Spiels ist ein Fehler aufgetreten.",
      steps: "Spiel und System aktualisieren und neu starten. Bleibt es bei einem Titel, den Titel neu installieren.",
    },
    {
      summary: "Starting a game produced an error.",
      steps: "Update the game and the system, then restart. If one title keeps failing, reinstall that title.",
    },
  ),
  entry(
    "PS4",
    "NW-31201-7",
    "network",
    {
      summary: "Die PS4 kommt nicht ins Netz.",
      steps:
        "Zuerst prüfen, ob PlayStation oder der Spielserver gerade gestört ist. Danach den Verbindungstest laufen lassen. Router-Firmware und zu viele Geräte im selben Netz bremsen oft.",
    },
    {
      summary: "The PS4 could not join the network.",
      steps:
        "Check first whether PlayStation or the game server is down. Then run the connection test. Router firmware and too many devices on the same network often get in the way.",
    },
  ),
  entry(
    "PS4",
    "NW-31254-5",
    "network",
    {
      summary: "Die Antwort des DNS-Servers kommt zu spät oder bricht ab.",
      steps:
        "Konsole und Router neu starten und den Verbindungstest wiederholen. Stehen DNS-Adressen von Hand drin, die Werte mit dem Anbieter prüfen.",
    },
    {
      summary: "The DNS server answered too late, or the answer dropped.",
      steps:
        "Restart the console and the router, then run the connection test again. If DNS addresses were typed in, check them with the provider.",
    },
  ),
  entry(
    "PS4",
    "NW-31246-6",
    "network",
    {
      summary: "Die DNS-Einstellungen passen nicht.",
      steps: "Automatische DNS-Einstellungen wählen oder die Adressen eintragen, die der Anbieter nennt. Danach den Test wiederholen.",
    },
    {
      summary: "The DNS settings are not valid.",
      steps: "Switch DNS to automatic, or enter the addresses the provider gave you. Then run the test again.",
    },
  ),
  entry(
    "PS4",
    "NW-31247-7",
    "network",
    {
      summary: "Die Netzwerkverbindung hat die Zeit überschritten.",
      steps: "Router neu starten und den Versuch möglichst per Kabel wiederholen. Ein überlastetes Netz bricht hier oft ab.",
    },
    {
      summary: "The network connection timed out.",
      steps: "Restart the router and try again, on a cable if you can. A crowded network often fails this way.",
    },
  ),
  entry(
    "PS4",
    "NW-31295-0",
    "network",
    {
      summary: "Das WLAN-Signal ist zu schwach für eine Verbindung.",
      steps: "Näher an den Router gehen oder ein Kabel nutzen. Wände und Abstand sind hier die übliche Ursache.",
    },
    {
      summary: "The Wi-Fi signal is too weak to connect.",
      steps: "Move closer to the router, or use a cable. Distance and walls are the usual cause.",
    },
  ),
  entry(
    "PS4",
    "NW-31473-8",
    "network",
    {
      summary: "Die Verbindung zum Server ist fehlgeschlagen.",
      steps: "Den Status von PlayStation prüfen, Konsole und Router neu starten und es erneut versuchen.",
    },
    {
      summary: "Connecting to the server failed.",
      steps: "Check the PlayStation status, restart the console and the router, and try again.",
    },
  ),
  entry(
    "PS4",
    "NW-31194-8",
    "network",
    {
      summary: "Die Internetverbindung der PS4 hat ein Problem.",
      steps:
        "Den Verbindungstest ausführen. Kommt die Konsole ins lokale Netz, aber nicht ins Internet, Router und Anbieter prüfen.",
    },
    {
      summary: "The PS4 internet connection has a problem.",
      steps:
        "Run the connection test. If the console joins the local network but not the internet, check the router and the provider.",
    },
  ),
  entry(
    "PS4",
    "NW-31374-8",
    "network",
    {
      summary: "Die Verbindung hat die Zeit überschritten.",
      steps: "Router neu starten und den Versuch wiederholen. Ein Kabel ist der einfachste Gegencheck.",
    },
    {
      summary: "The connection timed out.",
      steps: "Restart the router and try again. A cable is the simplest cross-check.",
    },
  ),
  entry(
    "PS4",
    "SU-30746-0",
    "update",
    {
      summary: "Das Systemupdate ist fehlgeschlagen.",
      steps:
        "Neu starten und das Update möglichst per Kabel erneut laden. Die liegen gebliebene Datei in den Benachrichtigungen löschen, bevor du es noch einmal anstößt. Mehrere Fehlschläge: Update per USB, wie auf der Sony-Seite beschrieben.",
    },
    {
      summary: "The system software update failed.",
      steps:
        "Restart and download the update again, on a cable if you can. Delete the leftover file in Notifications before you start it once more. Repeated failures: update from USB, as the Sony page describes.",
    },
  ),
  entry(
    "PS4",
    "SU-30645-8",
    "update",
    {
      summary: "Die PS4 erkennt die Update-Datei der Systemsoftware nicht.",
      steps: "Die Datei neu herunterladen. Eine unvollständige Datei vom USB verwirft die Konsole.",
    },
    {
      summary: "The PS4 does not recognize the system software update file.",
      steps: "Download the file again. The console rejects an incomplete file from USB.",
    },
  ),
  entry(
    "PS4",
    "SU-30625-6",
    "update",
    {
      summary: "Das Update der Systemsoftware ist fehlgeschlagen.",
      steps:
        "Erneut versuchen, am besten über ein ruhiges Netz. Geht der Download nicht durch, beschreibt die Sony-Seite den Weg über USB.",
    },
    {
      summary: "Updating the system software failed.",
      steps: "Try again, preferably on a quiet network. If the download will not finish, the Sony page describes the USB route.",
    },
  ),
  entry(
    "PS4",
    "SU-35931-1",
    "update",
    {
      summary: "Die Daten des Systemupdates sind unvollständig oder beschädigt.",
      steps: "Die Update-Datei löschen und neu herunterladen. Dieselbe angebrochene Datei nicht noch einmal installieren.",
    },
    {
      summary: "The system update data is incomplete or damaged.",
      steps: "Delete the update file and download it again. Do not install the same broken file a second time.",
    },
  ),
  entry(
    "PS4",
    "SU-42118-6",
    "update",
    {
      summary: "Beim Aktualisieren der PS4-Systemsoftware gab es ein Problem.",
      steps: "Das Update wiederholen und eine unvollständige Datei vorher löschen. Bleibt es hängen, die Schritte auf der Sony-Seite nutzen.",
    },
    {
      summary: "Updating the PS4 system software ran into a problem.",
      steps: "Repeat the update, and delete an incomplete file first. If it stays stuck, use the steps on the Sony page.",
    },
  ),
  entry(
    "PS4",
    "SU-41350-3",
    "update",
    {
      summary: "Die Update-Datei wird nicht erkannt.",
      steps: "Die Datei löschen und das passende Update für diese PS4 neu laden. Eine Datei für eine andere Konsole passt nicht.",
    },
    {
      summary: "The update file is not recognized.",
      steps: "Delete the file and download the update that belongs to this PS4. A file for another console will not do.",
    },
  ),
  entry(
    "PS4",
    "WS-37397-9",
    "network",
    {
      summary: "Der Server war nicht erreichbar.",
      steps: "Kurz warten und erneut versuchen. Den PlayStation-Status prüfen, bevor am Konto etwas geändert wird.",
    },
    {
      summary: "The server could not be reached.",
      steps: "Wait a moment and try again. Check the PlayStation status before changing anything on the account.",
    },
  ),
  entry(
    "PS4",
    "WS-37504-9",
    "network",
    {
      summary: "Ein PlayStation-Dienst ist in Wartung.",
      steps: "Nichts an der Konsole zurücksetzen. Den Status abwarten und den Dienst später erneut öffnen.",
    },
    {
      summary: "A PlayStation service is under maintenance.",
      steps: "Do not reset the console for this. Wait out the status, and open the service again later.",
    },
  ),
  entry(
    "PS4",
    "WS-37337-3",
    "account",
    {
      summary: "Das Konto ist vorübergehend gesperrt.",
      steps: "Nicht weiter versuchen, das Konto zu öffnen. Die Sperre läuft über Sony. Die verlinkte Seite beschreibt den Stand.",
    },
    {
      summary: "The account is suspended for the moment.",
      steps: "Stop trying to open the account. The suspension is on Sony's side. The linked page describes where things stand.",
    },
  ),
  entry(
    "PS4",
    "WS-37368-7",
    "account",
    {
      summary: "Das Konto ist gesperrt.",
      steps: "Das ist eine Kontosperre, kein Netzfehler. Ein Router-Neustart ändert daran nichts. Der Weg läuft über die Sony-Seite.",
    },
    {
      summary: "The account is suspended.",
      steps: "This is an account suspension, not a network fault. Restarting the router does not change it. The path runs through the Sony page.",
    },
  ),
  entry(
    "PS4",
    "WS-43689-0",
    "payment",
    {
      summary: "Bei der Zahlung ist ein Fehler aufgetreten.",
      steps: "Zahlungsmethode und Ablaufdatum prüfen. Dieselbe Karte nicht in kurzen Abständen immer wieder senden.",
    },
    {
      summary: "The payment ran into an error.",
      steps: "Check the payment method and the expiry date. Do not send the same card again and again in a short span.",
    },
  ),
  entry(
    "PS4",
    "WS-43701-5",
    "payment",
    {
      summary: "Im Guthaben reicht der Betrag für diesen Kauf nicht.",
      steps: "Das Guthaben prüfen oder eine andere Zahlungsart wählen. Der Kauf selbst läuft bei PlayStation, nicht auf dieser Seite.",
    },
    {
      summary: "The wallet does not have enough for this purchase.",
      steps: "Check the balance, or pick another way to pay. The purchase itself happens at PlayStation, not on this page.",
    },
  ),
  entry(
    "PS4",
    "WS-44369-6",
    "network",
    {
      summary: "PlayStation kann gerade gewartet werden.",
      steps:
        "Die Statusseite prüfen, die Konsole kurz vom Strom nehmen und den Router einige Minuten aus lassen. Erst danach die Anmeldung erneut versuchen.",
    },
    {
      summary: "PlayStation may be under maintenance.",
      steps:
        "Check the status page, unplug the console briefly, and leave the router off for a few minutes. Only then try to sign in again.",
    },
  ),
  entry(
    "PS4",
    "NP-34957-8",
    "network",
    {
      summary: "Die Verbindung zum Server hat gehakt.",
      steps: "Neu anmelden, den Verbindungstest laufen lassen und es später wiederholen.",
    },
    {
      summary: "The connection to the server stumbled.",
      steps: "Sign in again, run the connection test, and try later.",
    },
  ),
  entry(
    "PS4",
    "NP-31730-4",
    "network",
    {
      summary: "Beim Verbinden mit PlayStation ist ein Fehler aufgetreten.",
      steps: "Konsole und Router neu starten. Liegt eine Störung bei PlayStation, warten, bis sie vorbei ist.",
    },
    {
      summary: "Connecting to PlayStation produced an error.",
      steps: "Restart the console and the router. If PlayStation is having an outage, wait until it is over.",
    },
  ),
  entry(
    "PS4",
    "NP-36006-5",
    "account",
    {
      summary: "Die Trophäendaten können beschädigt sein.",
      steps:
        "Nichts am Konto löschen, um das zu erzwingen. Die Sony-Seite beschreibt den Abgleich der Trophäen. Hier steht nur, dass die Daten beschädigt sein können.",
    },
    {
      summary: "Trophy data may be damaged.",
      steps:
        "Do not delete the account to force a fix. The Sony page describes how trophies are reconciled. This note only says the data may be damaged.",
    },
  ),
  entry(
    "PS4",
    "NP-38551-2",
    "account",
    {
      summary: "Die PS4 wurde in kurzer Zeit zu oft als primäre Konsole aktiviert.",
      steps:
        "Einige Zeit warten und es einmal erneut versuchen. Nicht in einer Schleife auf Aktivieren drücken. Scheitert schon der erste Versuch, helfen ein Systemupdate und ein Router-Neustart, wie auf der Sony-Seite beschrieben.",
    },
    {
      summary: "This PS4 was activated as the primary console too often in a short time.",
      steps:
        "Wait a while and try once more. Do not hammer Activate. If the first attempt already failed, a system update and a router restart are what the Sony page suggests.",
    },
  ),
  entry(
    "PS4",
    "NP-35000-8",
    "network",
    {
      summary: "PlayStation ist in Wartung.",
      steps: "Warten, bis die Wartung vorbei ist. Die Konsole dafür nicht initialisieren.",
    },
    {
      summary: "PlayStation is under maintenance.",
      steps: "Wait until maintenance is over. Do not initialize the console because of this code.",
    },
  ),
  entry(
    "PS4",
    "NP-31866-4",
    "storage",
    {
      summary: "Beim Spielstand im Online-Speicher gab es ein Problem.",
      steps: "Das Netz prüfen und den Abgleich später erneut anstoßen. Den lokalen Spielstand nicht löschen, nur weil die Cloud stockt.",
    },
    {
      summary: "Saved data in online storage ran into a problem.",
      steps: "Check the network and try the sync again later. Do not delete the local save just because the cloud stalled.",
    },
  ),
  entry(
    "PS5",
    "CE-108255-1",
    "application",
    {
      summary: "Ein Spiel oder eine App auf der PS5 hat einen Fehler gemeldet.",
      steps:
        "Zuerst das Spiel aktualisieren. Kommt der Fehler nach dem Start wieder, das Spiel löschen und neu installieren. Cache leeren, die Datenbank neu aufbauen oder die Konsole zurücksetzen steht auf der Sony-Seite. Ein Zurücksetzen löscht den Speicher.",
    },
    {
      summary: "A game or app on the PS5 reported an error.",
      steps:
        "Update the game first. If the error returns after launch, delete the game and install it again. Clearing the cache, rebuilding the database, or resetting the console is on the Sony page. A reset erases storage.",
    },
  ),
  entry(
    "PS5",
    "CE-100028-1",
    "storage",
    {
      summary: "Auf der internen SSD ist zu wenig frei.",
      steps: "Unter Einstellungen, Speicher, Konsolenspeicher Platz schaffen und den Download erneut starten.",
    },
    {
      summary: "The internal SSD does not have enough free space.",
      steps: "Free space under Settings, Storage, Console Storage, then start the download again.",
    },
  ),
  entry(
    "PS5",
    "CE-108262-9",
    "system",
    {
      summary: "Beim Lesen der Systemsoftware oder von Anwendungsdaten ist ein Fehler aufgetreten.",
      steps: "Neu starten. Wiederholt sich der Code, die Sony-Seite zum Prüfen der Daten nutzen, bevor etwas gelöscht wird.",
    },
    {
      summary: "Reading the system software or application data produced an error.",
      steps: "Restart. If the code repeats, use the Sony page to check the data before deleting anything.",
    },
  ),
  entry(
    "PS5",
    "CE-100005-6",
    "application",
    {
      summary: "Das Spiel oder die App lässt sich nicht laden.",
      steps: "Neu starten und nach Updates sehen. Bleibt es bei einem Titel, den Titel neu installieren.",
    },
    {
      summary: "The game or app cannot load.",
      steps: "Restart and look for updates. If one title keeps failing, reinstall that title.",
    },
  ),
  entry(
    "PS5",
    "CE-107938-8",
    "update",
    {
      summary: "Das Update einer Anwendung ist fehlgeschlagen.",
      steps: "Freien Speicher prüfen, den Download abbrechen und neu starten.",
    },
    {
      summary: "Updating an application failed.",
      steps: "Check free space, cancel the download, and start it again.",
    },
  ),
  entry(
    "PS5",
    "CE-100002-3",
    "update",
    {
      summary: "Das Update einer Anwendung ist fehlgeschlagen.",
      steps: "Den Download löschen und neu starten. Speicherplatz und Netz vorher prüfen.",
    },
    {
      summary: "An application update failed.",
      steps: "Delete the download and start it again. Check storage and the network first.",
    },
  ),
  entry(
    "PS5",
    "CE-107520-5",
    "update",
    {
      summary: "Es wird eine neuere Systemsoftware verlangt.",
      steps: "Das Systemupdate installieren und die Aktion danach wiederholen.",
    },
    {
      summary: "A newer system software version is required.",
      steps: "Install the system update, then repeat the action.",
    },
  ),
  entry(
    "PS5",
    "CE-107649-7",
    "disc",
    {
      summary: "Die eingelegte Disc gehört nicht zu den installierten Daten.",
      steps: "Die Disc einlegen, die zur Installation passt, oder das Spiel passend zu dieser Disc neu installieren.",
    },
    {
      summary: "The inserted disc does not match the installed data.",
      steps: "Insert the disc that matches the installation, or reinstall the game so it matches this disc.",
    },
  ),
  entry(
    "PS5",
    "CE-110538-8",
    "disc",
    {
      summary: "Die Blu-ray konnte nicht gelesen werden.",
      steps: "Die Disc reinigen und erneut einlegen. Liest die PS5 keine Disc mehr, das Laufwerk prüfen lassen.",
    },
    {
      summary: "The Blu-ray could not be read.",
      steps: "Clean the disc and insert it again. If the PS5 stops reading discs entirely, have the drive checked.",
    },
  ),
  entry(
    "PS5",
    "CE-100006-7",
    "storage",
    {
      summary: "Ein externer Speicher wird nicht erkannt.",
      steps:
        "Das Laufwerk direkt anschließen, nicht über einen Hub ohne Strom, und die PS5 neu starten. Manche Laufwerke brauchen eine eigene Versorgung.",
    },
    {
      summary: "An external drive is not recognized.",
      steps:
        "Connect the drive directly, not through an unpowered hub, and restart the PS5. Some drives need their own power.",
    },
  ),
  entry(
    "PS5",
    "CE-109737-7",
    "storage",
    {
      summary: "Ein USB-Speicher wird nicht erkannt.",
      steps:
        "Abziehen, direkt einstecken und die Konsole neu starten. Ein anderer Anschluss oder ein anderes Gerät zeigt, ob der Stick selbst das Problem ist.",
    },
    {
      summary: "A USB drive is not recognized.",
      steps:
        "Unplug it, connect it directly, and restart the console. Another port or another device shows whether the drive itself is the problem.",
    },
  ),
  entry(
    "PS5",
    "CE-107872-5",
    "storage",
    {
      summary: "Im Konsolenspeicher ist zu wenig Platz.",
      steps: "Inhalte löschen, die nicht mehr gebraucht werden, und den Vorgang wiederholen.",
    },
    {
      summary: "Console storage does not have enough free space.",
      steps: "Delete content you no longer need, then try again.",
    },
  ),
  entry(
    "PS5",
    "CE-107255-0",
    "account",
    {
      summary: "PlayStation Plus lässt sich für dieses Konto nicht bestätigen.",
      steps: "Den Abo-Status im Konto prüfen und die Konsole neu anmelden. Ohne Netz kann die PS5 das Abo nicht nachsehen.",
    },
    {
      summary: "PlayStation Plus cannot be confirmed for this account.",
      steps: "Check the subscription on the account and sign the console in again. Without a network the PS5 cannot look the subscription up.",
    },
  ),
  entry(
    "PS5",
    "CE-112841-7",
    "account",
    {
      summary: "Du bist nicht angemeldet.",
      steps: "Mit dem PlayStation-Konto anmelden und den Vorgang wiederholen.",
    },
    {
      summary: "You are not signed in.",
      steps: "Sign in with the PlayStation account, then repeat the action.",
    },
  ),
  entry(
    "PS5",
    "CE-118851-4",
    "storage",
    {
      summary: "Der Abgleich der Spielstände mit dem Cloud-Speicher klappt nicht.",
      steps: "Das Netz prüfen und den Sync später erneut versuchen. Den lokalen Stand nicht löschen.",
    },
    {
      summary: "Save data will not sync with cloud storage.",
      steps: "Check the network and try the sync again later. Do not delete the local save.",
    },
  ),
  entry(
    "PS5",
    "CE-113338-9",
    "update",
    {
      summary: "Beim Update der PS5-Systemsoftware ist ein Fehler aufgetreten.",
      steps: "Das Update erneut laden. Steckt die Konsole fest, die Sony-Seite zum weiteren Vorgehen nutzen.",
    },
    {
      summary: "Updating the PS5 system software produced an error.",
      steps: "Download the update again. If the console is stuck, use the Sony page for what to do next.",
    },
  ),
  entry(
    "PS5",
    "CE-106485-4",
    "system",
    {
      summary: "Beim Lesen der Systemsoftware oder von Daten kann etwas nicht stimmen.",
      steps: "Neu starten. Kommt der Code wieder, die Schritte auf der Sony-Seite gehen, bevor etwas gelöscht wird.",
    },
    {
      summary: "There may be a problem reading the system software or other data.",
      steps: "Restart. If the code returns, follow the Sony page before deleting anything.",
    },
  ),
  entry(
    "PS5",
    "CE-107857-8",
    "application",
    {
      summary: "Beim Laden oder Aktualisieren einer Anwendung ist ein Fehler aufgetreten.",
      steps: "Das Update neu anstoßen. Hängt ein Titel, ihn neu installieren, nachdem Spielstände gesichert sind, soweit das noch geht.",
    },
    {
      summary: "Loading or updating an application produced an error.",
      steps: "Start the update again. If one title is stuck, reinstall it after backing up saves, while that still works.",
    },
  ),
  entry(
    "PS5",
    "NW-102307-3",
    "network",
    {
      summary: "Bei der Verbindung zu PlayStation ist ein Kommunikationsfehler aufgetreten.",
      steps: "Konsole und Router neu starten, den Verbindungstest ausführen und es später erneut versuchen.",
    },
    {
      summary: "A communication error came up while connecting to PlayStation.",
      steps: "Restart the console and the router, run the connection test, and try again later.",
    },
  ),
  entry(
    "PS5",
    "NW-102308-4",
    "network",
    {
      summary: "Beim Verbinden ist ein Kommunikationsfehler aufgetreten.",
      steps: "Neu starten und den Status von PlayStation prüfen. Die Seite zu genau diesem Code ist die Quelle, nicht ein benachbarter NW-Code.",
    },
    {
      summary: "A communication error came up while connecting.",
      steps: "Restart and check the PlayStation status. The page for this exact code is the source, not a neighbouring NW code.",
    },
  ),
  entry(
    "PS5",
    "NW-102636-8",
    "network",
    {
      summary: "Die Verbindung zu PlayStation hat die Zeit überschritten.",
      steps: "Den Router neu starten, möglichst per Kabel testen und den Versuch später wiederholen.",
    },
    {
      summary: "The connection to PlayStation timed out.",
      steps: "Restart the router, test on a cable if you can, and try again later.",
    },
  ),
  entry(
    "PS5",
    "NW-102468-1",
    "network",
    {
      summary: "Die PS5 kommt nicht ins Netz.",
      steps: "WLAN-Signal oder Kabel prüfen, den Verbindungstest ausführen und den Router neu starten.",
    },
    {
      summary: "The PS5 is not joining the network.",
      steps: "Check the Wi-Fi signal or the cable, run the connection test, and restart the router.",
    },
  ),
  entry(
    "PS5",
    "SU-101193-5",
    "update",
    {
      summary: "Die Systemsoftware ist nicht aktuell genug.",
      steps: "Das angebotene Systemupdate installieren.",
    },
    {
      summary: "The system software is not current enough.",
      steps: "Install the system update that is offered.",
    },
  ),
  entry(
    "PS5",
    "SU-101337-5",
    "system",
    {
      summary: "Die PS5 ist möglicherweise nicht sauber gestartet.",
      steps:
        "Stromkabel ziehen, einige Minuten warten, wieder einstecken. Startet sie danach nicht, setzt der abgesicherte Modus die Systemsoftware neu auf. Das kann Daten betreffen und steht so auf der Sony-Seite. Geht auch der abgesicherte Modus nicht, ist eine Reparatur dran.",
    },
    {
      summary: "The PS5 may not have started properly.",
      steps:
        "Unplug the power cable, wait a few minutes, and plug it back in. If it still will not start, Safe Mode reinstalls the system software. That can affect data, and the Sony page says so. If Safe Mode will not start either, the console needs repair.",
    },
  ),
  entry(
    "PS5",
    "SU-101495-0",
    "update",
    {
      summary: "Dieser Code sagt, dass die Systemsoftware bereits aktuell ist.",
      steps: "Kein Fehler, der ein weiteres Update erzwingt. Klemmt etwas anderes, den dazugehörigen Code getrennt nachschlagen.",
    },
    {
      summary: "This code means the system software is already up to date.",
      steps: "It is not an error that calls for another update. If something else is stuck, look that code up on its own.",
    },
  ),
  entry(
    "PS5",
    "WS-116329-2",
    "account",
    {
      summary: "Anmeldekennung oder Passwort passen nicht zusammen.",
      steps:
        "Unter Benutzer und Konten die Schreibweise prüfen. Passwörter unterscheiden Groß- und Kleinschreibung. Ein Versuch vom Computer zeigt, ob das Konto selbst noch geht.",
    },
    {
      summary: "The sign-in ID and password do not match.",
      steps:
        "Check the spelling under Users and Accounts. Passwords treat capitals and small letters as different. A try from a computer shows whether the account itself still works.",
    },
  ),
  entry(
    "PS5",
    "WS-116331-5",
    "account",
    {
      summary: "Der Zugang zu PlayStation ist vorübergehend gesperrt.",
      steps: "Nicht weiter Kennwörter raten. Die Sperre klärt Sony. Die verlinkte Seite ist der Ausgangspunkt.",
    },
    {
      summary: "Access to PlayStation is suspended for the moment.",
      steps: "Stop guessing passwords. Sony handles the suspension. The linked page is the place to start.",
    },
  ),
  entry(
    "PS5",
    "WS-116449-5",
    "network",
    {
      summary: "Der Dienst ist gerade in Wartung.",
      steps: "Warten und später erneut versuchen. Die Konsole dafür nicht zurücksetzen.",
    },
    {
      summary: "The service is under maintenance right now.",
      steps: "Wait and try again later. Do not reset the console for this.",
    },
  ),
  entry(
    "PS5",
    "WS-117176-3",
    "account",
    {
      summary: "Bei der Bestätigung in zwei Schritten stimmt etwas nicht.",
      steps: "Die hinterlegte Methode prüfen und einen neuen Code anfordern. Einen abgelaufenen Code nicht noch einmal eintippen.",
    },
    {
      summary: "Something is wrong with two-step verification.",
      steps: "Check the method saved on the account and request a new code. Do not type an expired code again.",
    },
  ),
  entry(
    "PS5",
    "WS-113947-5",
    "payment",
    {
      summary: "Die hinterlegte Zahlungsart stimmt nicht.",
      steps: "Ablaufdatum, Rechnungsadresse und Kartennummer im Konto prüfen. Der Kauf läuft über PlayStation.",
    },
    {
      summary: "The saved payment method does not check out.",
      steps: "Check the expiry date, billing address, and card number on the account. The purchase runs through PlayStation.",
    },
  ),
  entry(
    "PS5",
    "WS-116522-7",
    "update",
    {
      summary: "Das Systemupdate ist fehlgeschlagen.",
      steps: "Das Update neu starten, möglichst über ein stabiles Netz. Die genaue Folge steht auf der Sony-Seite.",
    },
    {
      summary: "The system update failed.",
      steps: "Start the update again, on a stable network if you can. The exact sequence is on the Sony page.",
    },
  ),
  entry(
    "PS5",
    "NP-102955-2",
    "account",
    {
      summary: "Die Kontodaten sind falsch.",
      steps: "Kennung und Passwort prüfen und erneut anmelden.",
    },
    {
      summary: "The account details are wrong.",
      steps: "Check the sign-in ID and password, then sign in again.",
    },
  ),
  entry(
    "PS5",
    "NP-102937-2",
    "account",
    {
      summary: "Du bist abgemeldet.",
      steps: "Erneut anmelden und den Vorgang wiederholen.",
    },
    {
      summary: "You are signed out.",
      steps: "Sign in again, then repeat what you were doing.",
    },
  ),
  entry(
    "PS5",
    "NP-102946-2",
    "update",
    {
      summary: "Es fehlt eine aktuelle Update-Datei.",
      steps: "Das Update installieren, bevor die Funktion weitergeht.",
    },
    {
      summary: "A current update file is missing.",
      steps: "Install the update before continuing with the feature.",
    },
  ),
  entry(
    "PS5",
    "NP-102944-0",
    "update",
    {
      summary: "Es wird die neueste Systemsoftware verlangt.",
      steps: "Das Systemupdate installieren und danach weitermachen.",
    },
    {
      summary: "The latest system software is required.",
      steps: "Install the system update, then carry on.",
    },
  ),
  entry(
    "PS5",
    "NP-103028-4",
    "account",
    {
      summary: "Die Anmeldung ist fehlgeschlagen.",
      steps: "Angaben und Netz prüfen, dann erneut anmelden.",
    },
    {
      summary: "Sign-in failed.",
      steps: "Check the details and the network, then sign in again.",
    },
  ),
  entry(
    "PS5",
    "NP-104291-7",
    "account",
    {
      summary: "Die Lizenz des Inhalts ließ sich nicht bestätigen.",
      steps:
        "Mit dem Konto anmelden, dem der Inhalt gehört, und das Netz prüfen. Ohne diese Bestätigung startet der Inhalt nicht.",
    },
    {
      summary: "The license for this content could not be confirmed.",
      steps: "Sign in with the account that owns the content, and check the network. Without that confirmation the content will not start.",
    },
  ),
];
