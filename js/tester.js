function tester() {
    return {
        lang: ('de').startsWith('de') ? 'de' : 'en',

        strings: {
            de: {
                heroTitle: 'Werde Beta-Tester für EquiPace!',
                heroSub: 'Hilf uns, die Kutschsport-App zu verbessern. Als Tester bekommst du frühzeitig Zugang zu neuen Funktionen — kostenlos.',
                step1Title: 'Opt-in-Link öffnen',
                step1Desc: 'Klicke auf den grünen Button unten. Du wirst zur Google Play Testseite weitergeleitet.',
                step2Title: '„Tester werden" antippen',
                step2Desc: 'Auf der Google Play Seite siehst du den Button „Tester werden". Tippe darauf, um dich als Tester anzumelden. Danach auf "download it on Google PLay"',
                step3Title: 'App installieren',
                step3Desc: 'Nach der Anmeldung kannst du EquiPace kostenlos aus dem Play Store installieren. Der Buy-Button wird zwar angezeigt,aber wenn du drauf klicktst sollte eine Info kommen das dir nichts in Rechnung gestellt wird.',
                step4Title: 'Testen & Feedback geben',
                step4Desc: 'Nutze die App und melde uns Fehler oder Verbesserungsvorschläge. Dein Feedback ist Gold wert!',
                ctaBtn: '🚀 Jetzt Tester werden',
                infoTitle: 'Wichtige Hinweise',
                info1: 'Du musst mit dem Google-Konto angemeldet sein, das zur Tester-Liste gehört.',
                info2: 'Es kann bis zu 15 Minuten dauern, bis der Download nach dem Opt-in verfügbar ist.',
                info3: 'Beta-Versionen können Fehler enthalten — das ist normal und genau deshalb testen wir!',
                info4: 'Deine Daten bleiben privat. Die App speichert alles nur lokal auf deinem Gerät.',
                feedbackTitle: 'Feedback geben',
                feedback1: 'Direkt in Google Play: Öffne die App-Seite im Play Store → „Privates Feedback an den Entwickler senden".',
                feedback2: 'Oder schreibe eine Nachricht an: thhillmer@gmail.com',
                footerThanks: 'Danke, dass du EquiPace besser machst! 🐴💚',
                footerApp: '→ Zur App'
            },
            en: {
                heroTitle: 'Become a Beta Tester for EquiPace!',
                heroSub: 'Help us improve the carriage driving companion app. As a tester you get early access to new features — for free.',
                step1Title: 'Open the opt-in link',
                step1Desc: 'Click the green button below. You\'ll be redirected to the Google Play testing page.',
                step2Title: 'Tap "Become a tester"',
                step2Desc: 'On the Google Play page you\'ll see a "Become a tester" button. Tap it to register as a tester.',
                step3Title: 'Install the app',
                step3Desc: 'After registering, you can install EquiPace for free from the Play Store. The price button will disappear.',
                step4Title: 'Test & give feedback',
                step4Desc: 'Use the app and report any bugs or suggestions. Your feedback is invaluable!',
                ctaBtn: '🚀 Become a Tester Now',
                infoTitle: 'Important Notes',
                info1: 'You must be signed in with the Google account that\'s on the tester list.',
                info2: 'It may take up to 15 minutes after opt-in before the download becomes available.',
                info3: 'Beta versions may contain bugs — that\'s normal and exactly why we\'re testing!',
                info4: 'Your data stays private. The app stores everything locally on your device only.',
                feedbackTitle: 'Give Feedback',
                feedback1: 'In Google Play: Open the app page in Play Store → "Send private feedback to developer".',
                feedback2: 'Or send a message to: thhillmer@gmail.com',
                footerThanks: 'Thanks for making EquiPace better! 🐴💚',
                footerApp: '→ Open App'
            }
        },

        t(key) {
            return this.strings[this.lang]?.[key] || this.strings['de']?.[key] || key;
        }
    };
}
