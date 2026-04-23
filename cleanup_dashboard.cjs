const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'screens', 'AdminDashboard.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Target 1: The extra div after question_bank
// Looking for:
//                    </div>
//             </div>
//           )}
// Should be:
//                    </div>
//           )}

const target1 = /<\/div>\s+<\/div>\s+<{\) == 'submissions'/; // This is a bit risky, let's use a more robust regex

// Let's replace the problematic block 1
// We know line 790: 790:                   </div>
// We know line 791: 791:             </div>
// We know line 792: 792:           )}

content = content.replace(/<\/div>\s+<\/div>\s+}\)/, (match) => {
    // If it has two closing divs and then the tab closure, it might be the error
    return '</div>\n          )}';
});

// Actually, let's do a very specific replacement for the area I viewed
const area1 = `                  </div>
            </div>
          )}`;

// Use a more literal replacement with what was seen in view_file
// 790:                   </div>
// 791:             </div>
// 792:           )}

// Let's use a simpler approach: replace the first occurrence of that pattern if it exists twice near each other
// Actually, I'll just look for the activeTab === 'submissions' and fix the closure before it.

const submissionsIndex = content.indexOf("{activeTab === 'submissions' && (");
if (submissionsIndex !== -1) {
    const beforeSubmissions = content.substring(0, submissionsIndex);
    const fixedBefore = beforeSubmissions.replace(/<\/div>\s+<\/div>\s+\)\}\s+$/, '</div>\n          )}\n\n          ');
    // content = fixedBefore + content.substring(submissionsIndex);
}

// Re-evaluating based on EXACT lines from view_file:
// 790:                   </div>
// 791:             </div>
// 792:           )}
// 793: 
// 794:           {activeTab === 'submissions' && (

// Let's use a very precise regex that matches the indentation found
content = content.replace(/                   <\/div>\n             <\/div>\n           \)}\n\n           {activeTab === 'submissions' && \(/, 
'                   </div>\n          )}\n\n          {activeTab === \'submissions\' && (');

// Target 2: The notes (evaluations) section
// 885:                </div>
// 886:             </div>
// 887:           )}
// 888: 
// 889:           {activeTab === 'students' && (

content = content.replace(/                <\/div>\n             <\/div>\n           \)}\n\n           {activeTab === 'students' && \(/, 
'                </div>\n               </div>\n            </div>\n          )}\n\n          {activeTab === \'students\' && (');

fs.writeFileSync(filePath, content);
console.log('Cleanup script finished.');
