@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'Laravel')
<img src="https://eng-card.com/material/images/brand-logo.png" class="logo" alt="Engcard">
@else
{{ $slot }}
@endif
</a>
</td>
</tr>
