import markdown
from fpdf import FPDF

with open('GitHub_Slack_Flow.md', 'r', encoding='utf-8') as f:
    text = f.read()

html = markdown.markdown(text)

pdf = FPDF()
pdf.add_page()
pdf.set_font('helvetica', size=12)
pdf.write_html(html)
pdf.output('GitHub_Slack_Flow.pdf')
