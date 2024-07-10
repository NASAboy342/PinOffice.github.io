namespace Pnut.Helpers
{
    public class EncryptHelper
    {
        public static string Encrypt5Shifted(string input)
        {
            return Encrypt(input, 5);
        }
        public static string Decrypt5Shifted(string input)
        {
            return Decrypt(input, 5);
        }
        public static string Encrypt(string input, int shift)
        {
            char[] result = new char[input.Length];
            for (int i = 0; i < input.Length; i++)
            {
                char originalChar = input[i];
                char encryptedChar;

                if (char.IsLetter(originalChar))
                {
                    char baseChar = char.IsUpper(originalChar) ? 'A' : 'a';
                    encryptedChar = (char)(((originalChar - baseChar + shift) % 26) + baseChar);
                }
                else
                {
                    // Non-letter characters remain unchanged
                    encryptedChar = originalChar;
                }

                result[i] = encryptedChar;
            }

            return new string(result);
        }

        public static string Decrypt(string input, int shift)
        {
            // To decrypt, we reverse the shift
            return Encrypt(input, 26 - shift);
        }
    }
}
