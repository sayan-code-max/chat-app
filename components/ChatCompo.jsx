export async function sendMassagetoGoogleGemini(params) {
    const apiKey = 'AIzaSyCsSZ7Yht3xk3-hTY_lyYY3507_jtASsYA';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: params
                            }
                        ]
                    }
                ]
            })
        });

        const data = await response.json();
        console.log(data);

        if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        } else {
            return 'No response from Google Gemini';
        }

    } catch (error) {
        console.error("API call failed:", error);
        return 'Could not fetch response from Gemini';
    }
}
