<?php
/**
 * TTC Walsdorf – Trainingsplan Backend
 * Speichert und liest Stimmen als JSON-Datei auf dem Server.
 * 
 * Endpunkte:
 *   GET  api.php          → gibt alle Stimmen als JSON zurück
 *   POST api.php          → speichert/aktualisiert Stimmen
 *   POST api.php?action=addplayer  → fügt neuen Spieler hinzu
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$DATA_FILE = __DIR__ . '/data.json';

// Initialdaten laden oder erstellen
function loadData() {
    global $DATA_FILE;
    if (!file_exists($DATA_FILE)) {
        $initial = [
            'votes' => new stdClass(),
            'customPlayers' => [],
        ];
        file_put_contents($DATA_FILE, json_encode($initial, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        return $initial;
    }
    $content = file_get_contents($DATA_FILE);
    return json_decode($content, true) ?: ['votes' => [], 'customPlayers' => []];
}

function saveData($data) {
    global $DATA_FILE;
    // Sicherheitskopie
    if (file_exists($DATA_FILE)) {
        copy($DATA_FILE, $DATA_FILE . '.bak');
    }
    file_put_contents($DATA_FILE, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

// === GET: Alle Daten laden ===
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = loadData();
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

// === POST: Daten speichern ===
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input) {
        http_response_code(400);
        echo json_encode(['error' => 'Ungültige JSON-Daten']);
        exit;
    }

    $action = $_GET['action'] ?? 'save';
    $data = loadData();

    if ($action === 'save') {
        // Stimmen aktualisieren (merge)
        if (isset($input['votes']) && is_array($input['votes'])) {
            foreach ($input['votes'] as $key => $value) {
                $data['votes'][$key] = $value;
            }
        }
        // Teams aktualisieren (vollständig ersetzen)
        if (isset($input['teams'])) {
            $data['teams'] = $input['teams'];
        }
        // Specials aktualisieren (vollständig ersetzen)
        if (isset($input['specials'])) {
            $data['specials'] = $input['specials'];
        }
        saveData($data);
        echo json_encode(['success' => true, 'message' => 'Gespeichert']);

    } elseif ($action === 'addplayer') {
        // Neuen Spieler hinzufügen
        $name = $input['name'] ?? '';
        if (empty($name)) {
            http_response_code(400);
            echo json_encode(['error' => 'Name fehlt']);
            exit;
        }
        if (!in_array($name, $data['customPlayers'])) {
            $data['customPlayers'][] = $name;
        }
        // Stimmen mitschreiben
        if (isset($input['votes']) && is_array($input['votes'])) {
            foreach ($input['votes'] as $key => $value) {
                $data['votes'][$key] = $value;
            }
        }
        saveData($data);
        echo json_encode(['success' => true, 'message' => 'Spieler hinzugefügt']);

    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Unbekannte Aktion']);
    }
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Methode nicht erlaubt']);
